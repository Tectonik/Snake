const helpers =
    {
        getRandomInRange: (min, max) =>
        {
            let random = Math.random() * (max - min) + min;
            return random;
        },

        objectsAreColliding: (firstObject, secondObject) =>
        {
            let objectsAreColliding =
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

            let randomCoordinates = { x, y };
            return randomCoordinates;
        },

        randomizeCoordinates: (objectToRandomizeCoordinatesOf, bounds) =>
        {
            let newCoordinates = helpers.getRandomCoordinates(
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
    };
