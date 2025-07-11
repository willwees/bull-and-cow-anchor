use anchor_lang::prelude::*;
use crate::state::BullAndCowGame;

#[derive(Accounts)]
pub struct CreateGame<'info> {
    // signer
    #[account(mut)]
    pub user: Signer<'info>,

    // game
    #[account(
        init,
        payer = user,
        space = 8 + BullAndCowGame::INIT_SPACE,
        seeds = [b"game", user.key().as_ref()],
        bump
    )]
    pub game: Account<'info, BullAndCowGame>,

    // system program
    pub system_program: Program<'info, System>,
}

pub fn create_game(ctx: Context<CreateGame>, number: u32) -> Result<()> {
    let new_game = &mut ctx.accounts.game;
    
    new_game.correct_answer = number;

    msg!("Game created with number: {}", number);

    Ok(())
}