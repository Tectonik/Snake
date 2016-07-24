class SnakeGameEngine extends GameEngine
{
    constructor(playingField, snake, feedCollection, renderers, renderingContext)
    {
        super(renderingContext, renderers);

        this._playingField = playingField;
        this._snake = snake;
        this._feedCollection = feedCollection;
        this._direction = directions.none;

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

    resetFrameCount()
    {
        this.frameCount = 0;
    }

    increaseFrameCount()
    {
        ++this.frameCount;
    }

    changeDirection(newDirection)
    {
        this.direction = newDirection;
    }

    pause()
    {
        clearInterval(this._gameStepIntervalId);
    }

    start()
    {
        this._startGameLogic();
        this._startRendering(this.renderers, this.playingField, this);
    }

    reactToArrowKeys(engine)
    {
        // Don't forget about the cool springy effect
        let disabledDirection = directions.none;

        let directionKeys = {
            37: directions.left,
            38: directions.up,
            39: directions.right,
            40: directions.down
        };

        // FIXME: Fuck.... What shite code!
        let oppositeDirection = {};
        oppositeDirection[directions.right] = directions.left;
        oppositeDirection[directions.down] = directions.up;
        oppositeDirection[directions.left] = directions.right;
        oppositeDirection[directions.up] = directions.down

        return function (keypress)
        {
            if (keypress && directionKeys.hasOwnProperty(+keypress.keyCode))
            {
                let currentKey = directionKeys[+keypress.keyCode];
                let currentDirection = engine.direction;
                if (currentDirection !== oppositeDirection[currentKey])
                {
                    engine.changeDirection(currentKey)
                }
            }
        };
    }

    gameLost(engine)
    {
        this.pause();
        console.log('Game lost, bounds reached');
    }

    gameWon()
    {
        console.log('You are whiner! Ies!');
    }

    _startGameLogic()
    {
        this._gameStepIntervalId = setInterval(
            // Example of array deconstruction
            ([snake, engine, feedCollection, playingField, goThroughOtherSide]) =>
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
                    engine.gameLost();
                }
            },
            CONSTANTS.GAME_LOGIC_TIME_INTERVAL_IN_MILLISECONDS,
            [this.snake, this, this.feedCollection, this.playingField, this._goThroughOtherSide]
        );
    }

    _goThroughOtherSide(snake, gameField)
    {
        // TODO: Refactor
        let snakeIsOutsideUpperBound = snake.y < gameField.y;
        let snakeIsOutsideLeftBound = snake.x < gameField.x;
        let snakeIsOutsideLowerBound = snake.y + snake.height > gameField.height;
        let snakeIsOutsideRightBound = snake.x + snake.width > gameField.width;

        if (snakeIsOutsideUpperBound)
        {
            snake.moveToCoordinates(snake.x, gameField.height - snake.height);
        }
        else if (snakeIsOutsideLeftBound)
        {
            snake.moveToCoordinates(gameField.width - snake.width, snake.y);
        }
        else if (snakeIsOutsideLowerBound)
        {
            snake.moveToCoordinates(snake.x, 0);
        }
        else if (snakeIsOutsideRightBound)
        {
            snake.moveToCoordinates(0, snake.y);
        }
    }

    _startRendering(renderers, playingField, engine)
    {
        function createRenderEverythingFunction(renderers, playingField, engine)
        {
            return function renderAllParameters()
            {
                engine.increaseFrameCount();
                playingField
                    .context
                    .clearRect(CONSTANTS.FIELD_LEFT, CONSTANTS.FIELD_TOP, CONSTANTS.FIELD_WIDTH, CONSTANTS.FIELD_HEIGHT);

                renderers.forEach(renderer => renderer.render());

                window.requestAnimationFrame(renderAllParameters);
            };
        }

        setInterval(
            ([engine]) =>
            {
                console.log(`Framerate: ${engine.frameCount}`);
                engine.resetFrameCount();
            },
            1000,
            [engine]);

        window.requestAnimationFrame(
            createRenderEverythingFunction(
                renderers,
                playingField,
                engine
            )
        );
    }
}