const helpers = Object.freeze(
    {
        getRandomInRange: (min, max) =>
        {
            const random = (Math.random() * (max - min)) + min;
            return random;
        },

        // I have no idea what this does or how it works *facepalm*
        // objectsAreColliding: (firstObject, secondObject) =>
        // {
        //     const objectsAreColliding =
        //         firstObject.x >= secondObject.x - secondObject.width &&
        //         firstObject.x <= secondObject.x + secondObject.width &&
        //         firstObject.y >= secondObject.y - secondObject.width &&
        //         firstObject.y <= secondObject.y + secondObject.width;

        //     return objectsAreColliding;
        // },

        // Example of Object destructuring, still too lazy to figure it out
        objectsAreColliding: ({ x: firstX, y: firstY }, { x: secondX, y: secondY, width: secondWidth }) =>
        {
            const objectsAreColliding =
                firstX >= secondX - secondWidth &&
                firstX <= secondX + secondWidth &&
                firstY >= secondY - secondWidth &&
                firstY <= secondY + secondWidth;

            return objectsAreColliding;
        },

        getRandomCoordinates: ({
            leftBound = constants.FIELD_LEFT,
            rightBound = constants.FIELD_WIDTH,
            upperBound = constants.FIELD_TOP,
            downBound = constants.FIELD_HEIGHT}) =>
        {
            const x = +helpers.getRandomInRange(leftBound, rightBound);
            const y = +helpers.getRandomInRange(upperBound, downBound);

            const randomCoordinates = { x, y };
            return randomCoordinates;
        },

        randomizeCoordinates: (objectToRandomizeCoordinatesOf, bounds) =>
        {
            const newCoordinates = helpers.getRandomCoordinates(
                {
                    upperBound: bounds.y,
                    leftBound: bounds.x,
                    downBound: bounds.height - objectToRandomizeCoordinatesOf.height,
                    rightBound: bounds.width - objectToRandomizeCoordinatesOf.width
                }
            );

            objectToRandomizeCoordinatesOf.y = newCoordinates.y;
            objectToRandomizeCoordinatesOf.x = newCoordinates.x;
        }
    });
