const helpers = Object.freeze(
    {
        getRandomInRange: (min, max) =>
        {
            const random = (Math.random() * (max - min)) + min;
            return random;
        },

        // // I have no idea what this does or how it works *facepalm*
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
        // TODO: Refactor
        objectsAreColliding: (
            firstObject = { x, y },
            secondObject = { x, y, width }) =>
        {
            const objectsAreColliding =
                firstObject.x >= secondObject.x - secondObject.width &&
                firstObject.x <= secondObject.x + secondObject.width &&
                firstObject.y >= secondObject.y - secondObject.width &&
                firstObject.y <= secondObject.y + secondObject.width;

            return objectsAreColliding;
        },

        // // getRandomCoordinates: (bounds) =>
        // {
        //     const x = +helpers.getRandomInRange(bounds.leftBound, bounds.rightBound);
        //     const y = +helpers.getRandomInRange(bounds.upperBound, bounds.downBound);

        //     const randomCoordinates = { x, y };
        //     return randomCoordinates;
        // },

        // TODO: Refactor
        getRandomCoordinates: (bounds = {
            leftBound,
            rightBound,
            upperBound,
            downBound
        }) =>
        {
            const x = +helpers.getRandomInRange(bounds.leftBound, bounds.rightBound);
            const y = +helpers.getRandomInRange(bounds.upperBound, bounds.downBound);

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
