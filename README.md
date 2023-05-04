## API resources

### `salespersons`
#### Methods
- GET /salespersons
- GET /salespersons/:id
#### Fields
- `id`
- `name`
- `registrationNum`
- `registrationStartDate`
- `registrationEndDate`
- `estateAgentName`
- `estateAgentRegistrationNum`
- `photoURL`



### `users`
#### Methods
- POST /users
- GET /users/:id
#### Fields
- `id`
- `name`
- `email`
- `photoURL`


### `reviews`
#### Methods
- POST /reviews
- GET /reviews/:id
#### Fields
- `id`
- `authorId`
- `salespersonId`
- `createdAt`
- `experiencedAt`
- `msg`
- `rating`
- `isVerified`



### `transactions`
#### Methods
- GET /salespersons/:id/transactions
#### Fields
- `id`
- `salespersonId`
- `transactionType`
- `transactedAt`
- `represented`
- `propertyType`
- `town`
- `district`
- `generalLocation`
