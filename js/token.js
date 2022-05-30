if (!window.ethers) {
    throw new Error("Require etherjs in the global scope to work!")
}

var BigNumber = ethers.BigNumber

var decimalFromWei = function(bn, decimals, precision = 4) {
    // If the decimals is just 2 then a precision of 4 doesn't make sense 
    // and leads to errors in the calculation.
    const correctedPrecision = Math.min(precision, decimals)

    // We create a cutoff at the offsetted decimal position.
    const cutoffPosition = decimals-correctedPrecision
    const precisionNumber = bn.div(BigNumber.from("10").pow(cutoffPosition))
    return precisionNumber.toNumber() / Math.pow(10, correctedPrecision)
}