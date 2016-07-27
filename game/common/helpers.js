const helpers = Object.freeze(
    {
        getRandomInRange: (min, max) =>
        {
            const random = Math.random() * (max - min) + min;
            return random;
        },

        objectsAreColliding: (firstObject, secondObject) =>
        {
            const objectsAreColliding =
                firstObject.x >= secondObject.x - secondObject.width &&
                firstObject.x <= secondObject.x + secondObject.width &&
                firstObject.y >= secondObject.y - secondObject.width &&
                firstObject.y <= secondObject.y + secondObject.width;

            return objectsAreColliding;
        },

        getRandomCoordinates: (limits) =>
        {
            this.x = helpers.getRandomInRange(limits.leftBound, limits.rightBound);
            this.y = helpers.getRandomInRange(limits.upperBound, limits.downBound);

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
