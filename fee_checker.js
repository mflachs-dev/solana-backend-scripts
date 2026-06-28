const { Connection, clusterApiUrl, Keypair, LAMPORTS_PER_SOL } = require('@solana/web3.js');

async function evaluateWalletFees() {
    console.log("🔍 Running Automated Fee Sufficiency Audit...");
    
    const connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
    const auditWallet = Keypair.generate();
    const address = auditWallet.publicKey.toString();

    // Standard baseline transaction network fee on Solana is roughly 0.000005 SOL
    const ESTIMATED_FEE_SOL = 0.000005; 

    try {
        const rawBalance = await connection.getBalance(auditWallet.publicKey);
        const currentBalanceSOL = rawBalance / LAMPORTS_PER_SOL;

        console.log(`\n[ACCOUNT] Address: ${address}`);
        console.log(`[BALANCE] Current Funds: ${currentBalanceSOL} SOL`);
        console.log(`[METRIC] Required Fee: ${ESTIMATED_FEE_SOL} SOL`);
        console.log("------------------------------------------------------------");

        // Conditional Logic: Evaluating if the account can afford a transaction
        if (currentBalanceSOL >= ESTIMATED_FEE_SOL) {
            console.log("✅ STATUS: SUFFICIENT FUNDS. Account is cleared to execute transactions.");
        } else {
            console.log("❌ STATUS: INSUFFICIENT FUNDS. Account requires a network deposit.");
            console.log(`⚠️ Shortfall: ${(ESTIMATED_FEE_SOL - currentBalanceSOL).toFixed(6)} SOL`);
        }

    } catch (error) {
        console.error("❌ Audit Interrupted: Network layer timed out or failed to respond.");
    }
}

evaluateWalletFees();
