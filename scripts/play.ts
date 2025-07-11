import * as anchor from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { BullAndCowAnchor } from "../target/types/bull_and_cow_anchor";

const connection = new anchor.web3.Connection(
  "https://testnet.dev2.eclipsenetwork.xyz",
  "confirmed",
);

const wallet = anchor.web3.Keypair.fromSecretKey(
    Uint8Array.from(
        JSON.parse(
            require("fs").readFileSync(
                require("os").homedir() + "/.config/solana/id.json", 
                "utf8",
            ),
        )
    ),
);

console.log("Wallet Public Key:", wallet.publicKey.toString());

const provider = new anchor.AnchorProvider(
  connection,
  new anchor.Wallet(wallet),
);

anchor.setProvider(provider);

const program = anchor.workspace.BullAndCowAnchor as Program<BullAndCowAnchor>;

console.log("Program ID:", program.programId.toString());

connection.getAccountInfo(program.programId).then((info) => {console.log("Program Account Info:", info);});

try {
    const createGameTx = program.methods
        .createGame(3)
        .accounts({
            user: wallet.publicKey,
        })
        .rpc().then((tx) => console.log("Create Game Transaction Signature:", tx));

    const [gamePDA] = anchor.web3.PublicKey.findProgramAddressSync(
        [Buffer.from("game"), wallet.publicKey.toBuffer()],
        program.programId,
    );

    // const guessTx = program.methods
    //     .bullAndCowGuess(2)
    //     .accounts({
    //         user: wallet.publicKey,
    //         game: gamePDA,
    //     })
    //     .rpc().then((tx) => console.log("Guess Transaction Signature:", tx));
} catch (error) {
    console.error("Error:", error);
}
