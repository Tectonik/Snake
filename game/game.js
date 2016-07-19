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
            CONSTANTS.SNAKE_SPEED,
            CONSTANTS.SNAKE_SIZE,
            CONSTANTS.SNAKE_SIZE
        );

        let feedStartingCoordinates = Feed.randomizeCoordinates(
            CONSTANTS.FIELD_TOP,
            CONSTANTS.FIELD_LEFT,
            CONSTANTS.FIELD_HEIGHT,
            CONSTANTS.FIELD_WIDTH
        );

        let feed = new Feed(
            feedStartingCoordinates.x,
            feedStartingCoordinates.y,
            CONSTANTS.FEED_SIZE,
            CONSTANTS.FEED_SIZE,
            CONSTANTS.FEED_DEFAULT_FILL_STYLE
        );

        let canvas = document.getElementsByClassName('playing-field')[0];

        this._playingField = new PlayingField(
            canvas,
            CONSTANTS.FIELD_HEIGHT,
            CONSTANTS.FIELD_WIDTH
        );

        let snakeRenderer = new SnakeRenderer(snake, this.playingField.gameContext);
        let feedRenderer = new FeedRenderer(feed, this.playingField.gameContext);

        this._engine = new SnakeGameEngine(
            this._playingField,
            snake,
            [feed],
            snakeRenderer,
            [feedRenderer],
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


