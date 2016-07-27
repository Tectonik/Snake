// TODO: Dependency injection??
class Game
{
    // Ctrl+shift+o -> AWESOME
    // Gargantuan constructor, needs beasts
    constructor()
    {
        const snake = new Snake(
            constants.SNAKE_STARTING_X,
            constants.SNAKE_STARTING_Y,
            constants.SNAKE_STARTING_LENGTH,
            constants.SNAKE_SIZE,
            constants.SNAKE_SIZE,
            constants.SNAKE_DEFAULT_SEGMENT_TYPE
        );

        // TODO: Fix major issue
        const feedStartingCoordinates = helpers.getRandomCoordinates(
            {
                upperBound: constants.FIELD_TOP,
                leftBound: constants.FIELD_LEFT,
                downBound: constants.FIELD_HEIGHT,
                rightBound: constants.FIELD_WIDTH
            }
        );

        // TODO: Refactor x and y
        const feed = new Feed(
            feedStartingCoordinates.x,
            feedStartingCoordinates.y,
            constants.FEED_SIZE,
            constants.FEED_SIZE,
            constants.FEED_DEFAULT_TYPE
        );

        const canvas = document.getElementsByClassName('playing-field')[0];

        this._playingField = new PlayingField(
            canvas,
            constants.FIELD_HEIGHT,
            constants.FIELD_WIDTH
        );

        const snakeRenderer = new SnakeRenderer(
            snake,
            this.playingField.context,
            {
                fill: constants.SNAKE_DEFAULT_FILL_COLOUR,
                stroke: constants.SNAKE_DEFAULT_STROKE_COLOUR,
                type: constants.SNAKE_DEFAULT_FILL_STYLE
            });

        const feedRenderer = new FeedRenderer(
            feed,
            this.playingField.context,
            {
                fill: constants.FEED_DEFAULT_FILL_COLOUR,
                stroke: constants.FEED_DEFAULT_STROKE_COLOUR,
                type: constants.FEED_DEFAULT_FILL_STYLE
            });

        this._engine = new SnakeGameEngine(
            this._playingField,
            snake,
            constants.SNAKE_SPEED,
            [feed],
            [feedRenderer, snakeRenderer],
            this._playingField.gameContext
        );
    }

    get playingField()
    {
        return this._playingField;
    }

    get engine()
    {
        return this._engine;
    }

    start()
    {
        this.engine.start();
    }

    pause()
    {
        this.engine.pause();
    }
}


