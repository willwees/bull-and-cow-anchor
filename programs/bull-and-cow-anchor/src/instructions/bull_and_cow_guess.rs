use anchor_lang::prelude::*;
use crate::errors::ErrorCode;
use crate::state::BullAndCowGame;

#[derive(Accounts)]
pub struct BullAndCowGuess<'info> {
    // signer
    #[account(mut)]
    pub user: Signer<'info>,

    // account game (sesi)
    #[account(mut)]
    pub game: Account<'info, BullAndCowGame>,

    // system program
    pub system_program: Program<'info, System>,
}

pub fn bull_and_cow_guess(ctx: Context<BullAndCowGuess>, guess: u32) -> Result<()> {
    let game = &mut ctx.accounts.game;

    if guess < game.correct_answer {
        return Err(ErrorCode::GuessTooLow.into());
    } else if guess > game.correct_answer {
        return Err(ErrorCode::GuessTooHigh.into());
    }

    Ok(())
}