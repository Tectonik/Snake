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

    resetframeCount()
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
        let disabledDirection = directionsEnum.none;

        let directionKeys = {
            37: directionsEnum.left,
            38: directionsEnum.up,
            39: directionsEnum.right,
            40: directionsEnum.down
        };

        // FIXME: Fuck.... What shite code!
        let oppositeDirection = {};
        oppositeDirection[directionsEnum.right] = directionsEnum.left;
        oppositeDirection[directionsEnum.down] = directionsEnum.up;
        oppositeDirection[directionsEnum.left] = directionsEnum.right;
        oppositeDirection[directionsEnum.up] = directionsEnum.down

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
            (engine) =>
            {
                console.log(`Framerate: ${engine.frameCount}`);
                engine.resetframeCount();
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