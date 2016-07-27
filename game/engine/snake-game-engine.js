class SnakeGameEngine extends GameEngine
{
    constructor(playingField, snake, snakeSpeed = constants.SNAKE_SPEED, feedCollection, renderers, renderingContext)
    {
        super(renderingContext, renderers);

        this._snakeSpeed = snakeSpeed;
        this._playingField = playingField;
        this._snake = snake;
        // NOT a violation of YAGNI
        this._feedCollection = feedCollection;
        this._direction = directions.none;

        document.onkeydown = this.startListeningForKeypresses(this);
    }

    get snakeSpeed()
    {
        return this._snakeSpeed;
    }

    set snakeSpeed(value)
    {
        this._snakeSpeed = value;
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
        this._startGameLogic(this.snake, this, this.feedCollection, this.playingField, this._goThroughOtherSide);
        this._startRendering(this.renderers, this.playingField, this, this.snake);
    }

    startListeningForKeypresses(engine)
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
        engine.pause();
        console.log('Game lost, cannibalism detected');
    }

    gameWon()
    {
        console.log('You are whiner! Ies!');
    }

    // TODO: Refactor, parameterize
    _startGameLogic(snake, engine, feedCollection, playingField, goThroughOtherSideCallback)
    {
        this._gameStepIntervalId = setInterval(
            // Example of array deconstruction
            ([snake, engine, feedCollection, playingField, goThroughOtherSideCallback]) =>
            {
                snake.changeDirection(engine.direction);

                feedCollection
                    .filter((feed) => snake.caughtFeed(feed))
                    .forEach(
                    (feed) =>
                    {
                        helpers.randomizeCoordinates(feed, playingField);
                    });

                if (playingField.objectIsWithinBounds(snake) === false)
                {
                    goThroughOtherSideCallback(snake, playingField);
                }

                if (snake.hasBittenItsTail())
                {
                    engine.gameLost();
                }
            },
            constants.GAME_LOGIC_TIME_INTERVAL_IN_MILLISECONDS,
            [snake, engine, feedCollection, playingField, goThroughOtherSideCallback]
        );
    }

    _goThroughOtherSide(snake, gameField)
    {
        // TODO: Refactor
        let snakeIsOutsideUpperBound = (snake.y < gameField.y);
        let snakeIsOutsideLeftBound = (snake.x < gameField.x);
        let snakeIsOutsideLowerBound = (snake.y + snake.height > gameField.height);
        let snakeIsOutsideRightBound = (snake.x + snake.width > gameField.width);

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

    _startRendering(renderers, playingField, engine, snake)
    {
        // TODO: Rename, move to constants
        let amplifier = 6;
        function renderAllParameters([renderers, playingField, engine, snake])
        {
            engine.increaseFrameCount();

            playingField
                .context
                .clearRect(constants.FIELD_LEFT, constants.FIELD_TOP, constants.FIELD_WIDTH, constants.FIELD_HEIGHT);

            renderers.forEach(
                (renderer) =>
                {
                    renderer.unrender();
                    renderer.render();
                });

            snake.move(constants.SNAKE_SPEED / amplifier);
        }

        window.setInterval(
            ([engine]) =>
            {
                console.log(`Framerate: ${engine.frameCount}`);
                engine.resetFrameCount();
            },
            1000,
            [engine]);

        window.setInterval(
            renderAllParameters,
            constants.GAME_LOGIC_TIME_INTERVAL_IN_MILLISECONDS / amplifier,
            [
                renderers,
                playingField,
                engine,
                snake
            ]);
    }
}