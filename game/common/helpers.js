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
        }
    };
