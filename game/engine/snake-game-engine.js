class SnakeGameEngine extends GameEngine
{
    constructor(playingField, snake, feedCollection, renderers, renderingContext)
    {
        super(renderingContext, renderers);

        this._playingField = playingField;
        this._snake = snake;
        this._feedCollection = feedCollection;
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

    pause()
    {
        clearInterval(this._gameStepIntervalId);
    }

    start()
    {
        this._startGameLogic();
        this._startRendering(this.renderers, this.playingField);
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
        this._gameStepIntervalId = setInterval(
            // Example of array deconstruction
            ([snake, engine, feedCollection, playingField, goThroughOtherSide, gameLost]) =>
            {
                snake.move(engine.direction);

                feedCollection
                    .filter((feed) => snake.caughtFeed(feed))
                    .forEach(
                    (feed) =>
                    {
                        let newCoordinates = helpers.getRandomCoordinates(
                            {
                                upperBound: playingField.y,
                                leftBound: playingField.x,
                                downBound: playingField.height - feed.height,
                                rightBound: playingField.width - feed.width
                            }
                        );

                        feed.y = newCoordinates.y;
                        feed.x = newCoordinates.x;
                    });

                if (playingField.objectIsWithinBounds(snake) === false)
                {
                    goThroughOtherSide(snake, playingField);
                }

                if (snake.hasBittenItsTail())
                {
                    gameLost();
                }
            },
            CONSTANTS.GAME_LOGIC_TIME_INTERVAL_IN_MILLISECONDS,
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
        console.log('You are whiner! Ies!');
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

    _startRendering(renderers, playingField)
    {
        function createRenderEverythingFunction(renderers, playingField)
        {
            return function renderAllParameters()
            {
                playingField
                    .gameContext
                    .clearRect(CONSTANTS.FIELD_LEFT, CONSTANTS.FIELD_TOP, CONSTANTS.FIELD_WIDTH, CONSTANTS.FIELD_HEIGHT);

                renderers.forEach(renderer => renderer.render());

                window.requestAnimationFrame(renderAllParameters);
            };
        }

        window.requestAnimationFrame(
            createRenderEverythingFunction(
                renderers,
                playingField
            )
        );
    }
}