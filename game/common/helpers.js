let helpers =
    {
        getRandomInRange: (min, max) =>
        {
            let random = Math.random() * (max - min) + min;
            return random;
        },

        objectsAreColliding: (firstObject, secondObject) =>
        {
            let objectsAreColliding = firstObject.x >= secondObject.x - secondObject.width &&
                firstObject.x <= secondObject.x + secondObject.width &&
                firstObject.y >= secondObject.y - secondObject.width &&
                firstObject.y <= secondObject.y + secondObject.width;

            return objectsAreColliding;
        },

        getRandomCoordinates: (limits) =>
        {
            // TODO: Refactor, use this
            this.x = helpers.getRandomInRange(limits.leftBound, limits.rightBound);
            this.y = helpers.getRandomInRange(limits.upperBound, limits.downBound);

            let randomCoordinates = { x, y };
            return randomCoordinates;
        }
    };
