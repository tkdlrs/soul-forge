//
class SkillSessionData {
    // Vars
    userId: number = 0;
    // Const
    constructor(userId: number) {
        //
        this.userId = userId;
    }
    // Methods
}

/**
 *
 * Need to get 'userId' first.
 *
 * That way when we query the database we only get the users data,
 * and not everyone's data.
 *
 * I want a Singleton for this since I want to get the useful data once.
 * Then I want to structure it the way I want and
 * then use it everywhere it's needed without needing to go back to the database.
 *
 * Goal is to keep things contained.
 *
 **/

export const skillSessionData = new SkillSessionData(1);

// todo: this needs stuff
