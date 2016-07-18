class SnakeGameEngine extends GameEngine
{
    constructor(playingField, snake, feedCollection, snakeRenderer, feedRenderers, renderingContext)
    {
        super(renderingContext);

        this._playingField = playingField;
        this._snake = snake;
        this._feedCollection = feedCollection;
        this._snakeRenderer = snakeRenderer;
        this._feedRenderers = feedRenderers;
        this._direction = directionsEnum.none;

        document.onkeydown = this.reactToArrowKeys(this);
    }

    get direction()
    {
        return this._direction;
    }

    set direction(value)
    {
        this._direction = value;
    }

    get playingField()
    {
        return this._playingField;
    }

    get snake()
    {
        return this._snake;
    }

    get feedCollection()
    {
        return this._feedCollection;
    }

    get snakeRenderer()
    {
        return this._snakeRenderer;
    }

    get feedRenderers()
    {
        return this._feedRenderers;
    }

    pause()
    {
        clearInterval(this._gameStepIntervalId);
    }

    start()
    {
        this._startGameLogic();
        this._startRendering();
    }

    reactToArrowKeys(engine)
    {
        // Don't forget about the cool springy effect
        let disabledDirection = directionsEnum.none;
        return function (keypress)
        {
            if (keypress)
            {
                switch (+keypress.keyCode)
                {
                    case 38:
                        if (engine.direction !== directionsEnum.down) { engine.direction = directionsEnum.up; }
                        break;
                    case 40:
                        if (engine.direction !== directionsEnum.up) { engine.direction = directionsEnum.down; }
                        break;
                    case 37:
                        if (engine.direction !== directionsEnum.right) { engine.direction = directionsEnum.left; }
                        break;
                    case 39:
                        if (engine.direction !== directionsEnum.left) { engine.direction = directionsEnum.right; }
                        break;
                    default:
                        console.log('incorrect code: ' + keypress.keyCode);
                        break;
                }
            }
        };
    }

    _startGameLogic()
    {
        // Event
        this._gameStepIntervalId = setInterval(
            // Example of array deconstruction
            ([snake, engine, feedCollection, gameField, goThroughOtherSide, gameLost]) =>
            {
                snake.move(engine.direction);

                feedCollection
                    .filter((feed) => snake.caughtFeed(feed))
                    .forEach(
                    (feed) =>
                    {
                        let newX = helpers.getRandomInRange(CONSTANTS.FIELD_LEFT, CONSTANTS.FIELD_WIDTH + feed.width);
                        let newY = helpers.getRandomInRange(CONSTANTS.FIELD_TOP, CONSTANTS.FIELD_HEIGHT + feed.height);

                        feed.x = newX;
                        feed.y = newY;
                    });

                if (gameField.objectIsWithinBounds(snake) === false) { goThroughOtherSide(snake, gameField); }
                if (snake.hasBittenItsTail()) { gameLost(); }
            },
            CONSTANTS.FRAME_TIME_INTERVAL_IN_MILLISECONDS,
            [this.snake, this, this.feedCollection, this.playingField, this._goThroughOtherSide, this.gameLost]
        );
    }

    gameLost()
    {
        this.pause();
        console.log('Game lost, bounds reached');
    }

    gameWon()
    {

    }

    _goThroughOtherSide(snake, gameField)
    {
        if (snake.y < gameField.y)
        {
            snake.moveToCoordinates(snake.x, gameField.height - snake.height);
        }
        else if (snake.x < gameField.x)
        {
            snake.moveToCoordinates(gameField.width - snake.width, snake.y);
        }
        else if (snake.y + snake.height > gameField.height)
        {
            snake.moveToCoordinates(snake.x, 0);
        }
        else if (snake.x + snake.width > gameField.width)
        {
            snake.moveToCoordinates(0, snake.y);
        }
    }

    _startRendering()
    {
        function createRenderEverythingFunction(snakeRenderer, feedRenderers, playingField)
        {
            return function renderAllParameters()
            {
                playingField
                    .gameContext
                    .clearRect(CONSTANTS.FIELD_LEFT, CONSTANTS.FIELD_TOP, CONSTANTS.FIELD_WIDTH, CONSTANTS.FIELD_HEIGHT);

                snakeRenderer.render();
                feedRenderers.forEach(feedRenderer => feedRenderer.render());

                window.requestAnimationFrame(renderAllParameters);
            };
        }

        window.requestAnimationFrame(
            createRenderEverythingFunction(
                this.snakeRenderer,
                this.feedRenderers,
                this.playingField
            )
        );
    }
}