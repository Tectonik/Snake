const constants = Object.freeze(
    {
        GAME_IS_IN_DEBUG_MODE: false,
        GAME_LOGIC_TIME_INTERVAL_IN_MILLISECONDS: 100,
        DESIRED_FRAMERATE: 60,

        FIELD_LEFT: 0,
        FIELD_TOP: 0,
        FIELD_WIDTH: 700,
        FIELD_HEIGHT: 400,

        SNAKE_STARTING_X: 350,
        SNAKE_STARTING_Y: 200,
        SNAKE_STARTING_LENGTH: 2000,
        SNAKE_SIZE: 20,
        SNAKE_DEFAULT_FILL_COLOUR: 'green',
        SNAKE_DEFAULT_STROKE_COLOUR: 'darkgreen',

        // TODO: Refactor
        SNAKE_SPEED: 200,
        SNAKE_DEFAULT_FILL_STYLE: fillStyles.fill,
        SNAKE_DEFAULT_SEGMENT_TYPE: segmentTypes.rectangle,

        FEED_SIZE: 10,
        FEED_DEFAULT_FILL_STYLE: fillStyles.fillAndStroke,
        FEED_DEFAULT_TYPE: feedTypes.rectangle,
        FEED_DEFAULT_FILL_COLOUR: 'red',
        FEED_DEFAULT_STROKE_COLOUR: 'orange'
    });