import type { HardwareComponent, SelectedParts, CompatibilityReport, IncompatibilityDetail, FormFactor } from '../types/pcBuilder';


const FORM_FACTOR_RANKS: Record<FormFactor, number> = {
  'Mini-ITX': 1,
  'Micro-ATX': 2,
  'ATX': 3,
  'E-ATX': 4,
};

export function calculateEstimatedWattage(parts: SelectedParts): number {
  let wattage = 0;
  // Component specific draws
  if (parts.cpu) wattage += parts.cpu.wattage;
  if (parts.gpu) wattage += parts.gpu.wattage;
  if (parts.cooler) wattage += parts.cooler.wattage;
  if (parts.motherboard) wattage += parts.motherboard.wattage;
  if (parts.ram) wattage += parts.ram.wattage;
  if (parts.storage) wattage += parts.storage.wattage;
  
  // Baseline system draw for fans, chipset, RGB
  if (Object.values(parts).some(p => p !== null && p !== undefined)) {
    wattage += 25;
  }
  return wattage;
}

export function calculateTotalPrice(parts: SelectedParts): number {
  return Object.values(parts).reduce((acc, part) => {
    return acc + (part ? part.price : 0);
  }, 0);
}

export function evaluateCompatibility(parts: SelectedParts): CompatibilityReport {
  const errors: IncompatibilityDetail[] = [];
  const warnings: IncompatibilityDetail[] = [];

  const categoryStatus: CompatibilityReport['categoryStatus'] = {
    cpu: { selected: !!parts.cpu, isCompatible: true },
    cooler: { selected: !!parts.cooler, isCompatible: true },
    motherboard: { selected: !!parts.motherboard, isCompatible: true },
    ram: { selected: !!parts.ram, isCompatible: true },
    gpu: { selected: !!parts.gpu, isCompatible: true },
    storage: { selected: !!parts.storage, isCompatible: true },
    psu: { selected: !!parts.psu, isCompatible: true },
    case: { selected: !!parts.case, isCompatible: true },
  };

  // 1. CPU & Motherboard (Socket match)
  if (parts.cpu && parts.motherboard) {
    if (parts.cpu.specs.socket !== parts.motherboard.specs.socket) {
      const msg = `Socket mismatch: ${parts.cpu.name} requires an ${parts.cpu.specs.socket} socket, but ${parts.motherboard.name} has an ${parts.motherboard.specs.socket} socket.`;
      errors.push({
        category: 'cpu',
        relatedCategory: 'motherboard',
        message: msg,
        severity: 'error',
      });
      categoryStatus.cpu.isCompatible = false;
      categoryStatus.cpu.reason = msg;
      categoryStatus.motherboard.isCompatible = false;
      categoryStatus.motherboard.reason = msg;
    }
  }

  // 2. Motherboard & RAM (DDR Generation match)
  if (parts.motherboard && parts.ram) {
    if (parts.motherboard.specs.ddrGen !== parts.ram.specs.ddrGen) {
      const msg = `Memory generation mismatch: ${parts.motherboard.name} supports ${parts.motherboard.specs.ddrGen}, but ${parts.ram.name} is ${parts.ram.specs.ddrGen}.`;
      errors.push({
        category: 'ram',
        relatedCategory: 'motherboard',
        message: msg,
        severity: 'error',
      });
      categoryStatus.ram.isCompatible = false;
      categoryStatus.ram.reason = msg;
      if (categoryStatus.motherboard.isCompatible) {
        categoryStatus.motherboard.isCompatible = false;
        categoryStatus.motherboard.reason = msg;
      }
    }
  }

  // 3. Motherboard & Case (Form Factor clearance)
  if (parts.motherboard && parts.case) {
    const mbForm = parts.motherboard.specs.formFactor;
    const caseSupported = parts.case.specs.supportedFormFactors || [];
    
    if (mbForm && caseSupported.length > 0) {
      const mbRank = FORM_FACTOR_RANKS[mbForm] || 3;
      const isFits = caseSupported.some(cf => (FORM_FACTOR_RANKS[cf] || 0) >= mbRank);
      
      if (!isFits) {
        const msg = `Form Factor fit error: ${parts.motherboard.name} (${mbForm}) will not fit inside ${parts.case.name} (Supports max: ${caseSupported.join(', ')}).`;
        errors.push({
          category: 'motherboard',
          relatedCategory: 'case',
          message: msg,
          severity: 'error',
        });
        categoryStatus.motherboard.isCompatible = false;
        categoryStatus.motherboard.reason = msg;
        categoryStatus.case.isCompatible = false;
        categoryStatus.case.reason = msg;
      }
    }
  }

  // 4. CPU Cooler & Socket compatibility
  if (parts.cpu && parts.cooler) {
    const cpuSocket = parts.cpu.specs.socket;
    const coolerSupported = parts.cooler.specs.supportedSockets || [];
    if (cpuSocket && coolerSupported.length > 0 && !coolerSupported.includes(cpuSocket)) {
      const msg = `Cooler bracket conflict: ${parts.cooler.name} does not include bracket mounting for ${cpuSocket} socket (${parts.cpu.name}).`;
      errors.push({
        category: 'cooler',
        relatedCategory: 'cpu',
        message: msg,
        severity: 'error',
      });
      categoryStatus.cooler.isCompatible = false;
      categoryStatus.cooler.reason = msg;
    }
  }

  // 5. PSU Wattage Headroom Check
  const estimatedWattage = calculateEstimatedWattage(parts);
  const psuCapacity = parts.psu ? parts.psu.specs.psuWattage || parts.psu.wattage : 0;

  if (parts.psu) {
    const requiredHeadroomWattage = estimatedWattage + 100;
    if (psuCapacity < requiredHeadroomWattage) {
      const msg = `Insufficient PSU Power: Total system load estimated at ${estimatedWattage}W (+100W buffer = ${requiredHeadroomWattage}W needed), but ${parts.psu.name} provides only ${psuCapacity}W.`;
      errors.push({
        category: 'psu',
        message: msg,
        severity: 'error',
      });
      categoryStatus.psu.isCompatible = false;
      categoryStatus.psu.reason = msg;
    } else if (psuCapacity < estimatedWattage + 150) {
      warnings.push({
        category: 'psu',
        message: `Tight power margin: ${psuCapacity}W supply provides limited headroom for future GPU upgrades or CPU overclocking.`,
        severity: 'warning',
      });
    }
  }

  // General Warning for high-end CPU without liquid cooler
  if (parts.cpu && parts.cpu.wattage > 150 && parts.cooler && parts.cooler.tier === 'budget') {
    warnings.push({
      category: 'cooler',
      message: `Thermal throttling risk: High wattage CPU (${parts.cpu.name}, ${parts.cpu.wattage}W) is paired with a entry-tier cooler. 240mm+ liquid cooling is recommended.`,
      severity: 'warning',
    });
  }

  return {
    isCompatible: errors.length === 0,
    totalWattage: estimatedWattage,
    psuCapacity,
    totalPrice: calculateTotalPrice(parts),
    errors,
    warnings,
    categoryStatus,
  };
}

export function checkComponentCompatibilityWithBuild(
  item: HardwareComponent,
  currentBuild: SelectedParts
): { isCompatible: boolean; reason?: string } {
  // Create candidate build state
  const candidateBuild: SelectedParts = {
    ...currentBuild,
    [item.category]: item,
  };

  const report = evaluateCompatibility(candidateBuild);
  
  // Find errors related to this component
  const relevantError = report.errors.find(
    e => e.category === item.category || e.relatedCategory === item.category
  );

  if (relevantError) {
    return {
      isCompatible: false,
      reason: relevantError.message,
    };
  }

  return {
    isCompatible: true,
  };
}
