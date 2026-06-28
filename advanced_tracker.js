const { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js');

async function executeAdvancedTracker() {
    console.log("=================================================================");
    console.log("     INITIALIZING DECENTRALIZED ASSET AUDIT ENGINE (v1.0.0)      ");
    console.log("=================================================================");

    // 1. Instantiating Cryptographic Keypair Architecture
    const devWallet = Keypair.generate();
    const publicKeyString = devWallet.publicKey.toString();
    
    console.log(`[SYS] Cryptographic Key Generation: SUCCESS`);
    console.log(`[SYS] Secure Target Address: ${publicKeyString}`);
    console.log("-----------------------------------------------------------------");

    // 2. Establishing High-Performance RPC Connection Node
    const rpcEndpoint = clusterApiUrl('devnet');
    const connection = new Connection(rpcEndpoint, 'confirmed');
    
    try {
        console.log(`[RPC] Dialing Endpoint: ${rpcEndpoint}`);
        
        // Fetching concurrent ledger state data metrics
        const currentSlot = await connection.getSlot();
        const blockTime = await connection.getBlockTime(currentSlot);
        
        console.log(`[RPC] Handshake Established. Live Slot: ${currentSlot}`);
        if (blockTime) {
            console.log(`[RPC] Network Timestamp: ${new Date(blockTime * 1000).toUTCString()}`);
        }

        // 3. Executing Isolated Balance Ledger Query
        console.log(`[DATA] Fetching live address balance mappings...`);
        const rawBalance = await connection.getBalance(devWallet.publicKey);
        const formattedBalance = rawBalance / LAMPORTS_PER_SOL;

        // 4. Formatting Engineering Dashboard UI Terminal Output
        console.log("=================================================================");
        console.log("                 REAL-TIME LEDGER AUDIT MATRIX                   ");
        console.log("=================================================================");
        console.table([
            { Metric: 'Target Address', Value: `${publicKeyString.slice(0, 8)}...${publicKeyString.slice(-8)}` },
            { Metric: 'Network Environment', Value: 'Solana Devnet (RPC Global)' },
            { Metric: 'Current Block Height', Value: currentSlot.toLocaleString() },
            { Metric: 'Liquid Assets', Value: `${formattedBalance} SOL` },
            { Metric: 'Account Status', Value: rawBalance === 0 ? 'UNFUNDED / ACTIVE' : 'FUNDED / ACTIVE' }
        ]);
        console.log("=================================================================");
        console.log("[STATUS] Milestone Core Execution Terminated Freely with Zero Errors.");

    } catch (networkError) {
        console.error("\n[CRITICAL ERROR] Failed to parse live ledger data metrics matrix:");
        console.error(`>> Reason: ${networkError.message}`);
    }
}

executeAdvancedTracker();
