// TODO: Dependency injection??
class Game
{
    // Ctrl+shift+o -> AWESOME
    // Gargantuan constructor, needs beasts
    constructor()
    {
        let snake = new Snake(
            CONSTANTS.SNAKE_STARTING_X,
            CONSTANTS.SNAKE_STARTING_Y,
            CONSTANTS.SNAKE_STARTING_LENGTH,
            CONSTANTS.SNAKE_SIZE,
            CONSTANTS.SNAKE_SIZE,
            CONSTANTS.SNAKE_DEFAULT_SEGMENT_TYPE
        );

        // TODO: Fix major issue
        let feedStartingCoordinates = helpers.getRandomCoordinates(
            {
                upperBound: CONSTANTS.FIELD_TOP,
                leftBound: CONSTANTS.FIELD_LEFT,
                downBound: CONSTANTS.FIELD_HEIGHT,
                rightBound: CONSTANTS.FIELD_WIDTH
            }
        );

        // TODO: Refactor x and y
        let feed = new Feed(
            feedStartingCoordinates.x,
            feedStartingCoordinates.y,
            CONSTANTS.FEED_SIZE,
            CONSTANTS.FEED_SIZE,
            CONSTANTS.FEED_DEFAULT_TYPE
        );

        let canvas = document.getElementsByClassName('playing-field')[0];

        this._playingField = new PlayingField(
            canvas,
            CONSTANTS.FIELD_HEIGHT,
            CONSTANTS.FIELD_WIDTH
        );

        let snakeRenderer = new SnakeRenderer(snake, this.playingField.context, CONSTANTS.SNAKE_DEFAULT_FILL_STYLE);
        let feedRenderer = new FeedRenderer(feed, this.playingField.context, CONSTANTS.FEED_DEFAULT_FILL_STYLE);

        this._engine = new SnakeGameEngine(
            this._playingField,
            snake,
            CONSTANTS.SNAKE_SPEED,
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


