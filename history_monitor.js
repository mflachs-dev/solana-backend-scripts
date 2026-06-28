const { Connection, clusterApiUrl, PublicKey } = require('@solana/web3.js');

async function runHistoryMonitor() {
    console.log("=================================================================");
    console.log("     SYNCHRONIZING WITH HISTORICAL TRANSACTION PIPELINE (v1.0.0) ");
    console.log("=================================================================");

    // Connecting to the network endpoint matching your other scripts
    const rpcEndpoint = clusterApiUrl('devnet');
    const connection = new Connection(rpcEndpoint, 'confirmed');

    // Utilizing a highly active public Devnet system wallet address to guarantee real data outputs
    const sampleTargetAddress = '83v8GsXp97zP7pG6oHw7XoD4bQ1yF5VwM9zK7xY4gC8N';
    const recordEvaluationLimit = 3;

    try {
        console.log(`[SYS] Initializing Parse Sequence for Account Target Key...`);
        console.log(`[SYS] Target Signature Address: ${sampleTargetAddress}`);
        console.log("-----------------------------------------------------------------");

        // Convert the string address into an official Solana PublicKey object instance
        const targetPubKey = new PublicKey(sampleTargetAddress);

        // Requesting the confirmed transaction list signatures directly from the blockchain ledger
        console.log(`[RPC] Querying ledger transaction sequences (Max Records: ${recordEvaluationLimit})...`);
        const historicalSignatures = await connection.getSignaturesForAddress(
            targetPubKey,
            { limit: recordEvaluationLimit }
        );

        console.log("=================================================================");
        console.log("               LEDGERLENS ACCOUNT ACTION METRICS                 ");
        console.log("=================================================================");

        if (historicalSignatures.length === 0) {
            console.log("ℹ️  [DATA MANAGER] System Log: Zero account ledger events recorded.");
        } else {
            // Mapping through the history logs to generate a highly professional data array
            const structuralOutputData = historicalSignatures.map((tx, matrixIndex) => {
                const blockTimestamp = tx.blockTime 
                    ? new Date(tx.blockTime * 1000).toUTCString() 
                    : "Validating Node Sync State";

                return {
                    'Index': `#${matrixIndex + 1}`,
                    'Signature Key': `${tx.signature.slice(0, 12)}...`,
                    'Execution Block': tx.slot.toLocaleString(),
                    'Execution Status': tx.err ? '❌ FAILED TRANSACTION' : '🟢 SUCCESS (VERIFIED)',
                    'Ledger Timestamp': blockTimestamp
                };
            });

            // Displaying structural results matching the styling matrix in advanced_tracker.js
            console.table(structuralOutputData);
        }

        console.log("=================================================================");
        console.log("[STATUS] History Parser Log Stream Disconnected Safely with Zero Errors.");

    } catch (pipelineError) {
        console.error("\n[CRITICAL ERROR] Failed to parse historical transaction ledger arrays:");
        console.error(`>> Reason: ${pipelineError.message}`);
    }
}

runHistoryMonitor();
