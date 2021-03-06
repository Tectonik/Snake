class SnakeGameEngine extends GameEngine
{
    constructor(playingField, snake, snakeSpeed, feedCollection, renderers, renderingContext)
    {
        super(renderingContext, renderers);

        this._snakeSpeed = snakeSpeed;
        this._playingField = playingField;
        this._snake = snake;
        // NOT a violation of YAGNI... I think
        this._feedCollection = feedCollection;
        this._direction = directions.none;

        document.onkeydown = this.startListeningForKeypresses(this);
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
        this._startRendering(this.renderers, this.playingField, this, this.snake, constants.DESIRED_FRAMERATE);
    }

    startListeningForKeypresses(engine)
    {
        // Don't forget about the cool springy effect
        // let disabledDirection = directions.none;

        const left = directions.left;
        const up = directions.up;
        const right = directions.right;
        const down = directions.down;

        const directionKeys =
            {
                37: left,
                38: up,
                39: right,
                40: down
            };

        const oppositeDirection =
            {
                left: right,
                up: down,
                right: left,
                down: up
            };

        return (keypress) =>
        {
            if (keypress && directionKeys.hasOwnProperty(+keypress.keyCode))
            {
                const currentKey = directionKeys[+keypress.keyCode];
                const currentDirection = engine.direction;
                if (currentDirection !== oppositeDirection[currentKey])
                {
                    engine.changeDirection(currentKey);
                }
            }
        };
    }

    gameLost(engine, reason)
    {
        engine.pause();
        console.log(`Game lost, {reason}`);
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
                    .forEach((feed) =>
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
        // TODO: Refactorh
        const snakeIsOutsideUpperBound = (snake.y < gameField.y);
        const snakeIsOutsideLeftBound = (snake.x < gameField.x);
        const snakeIsOutsideLowerBound = ((snake.y + snake.height) > gameField.height);
        const snakeIsOutsideRightBound = ((snake.x + snake.width) > gameField.width);

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

    _startRendering(renderers, playingField, engine, snake, framerate)
    {
        // TODO: Rename, move to constants
        let then = Date.now();
        const interval = 1000 / framerate;

        (function renderAllParameters()
        {
            const now = Date.now();
            const timeDelta = (now - then);

            if (timeDelta > interval)
            {
                engine.increaseFrameCount();

                playingField.clear();

                renderers.forEach((renderer) =>
                {
                    renderer.unrender();
                    renderer.render();
                });

                // Framerate coupling
                snake.move(constants.SNAKE_SPEED / framerate);
                then = now - (timeDelta % interval);
            }

            window.requestAnimationFrame(renderAllParameters);
        } ());

        window.setInterval(
            ([engine]) =>
            {
                console.log(`Framerate: ${engine.frameCount}`);
                engine.resetFrameCount();
            },
            1000,
            [engine]);
    }
}