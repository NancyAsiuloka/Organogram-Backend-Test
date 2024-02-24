/**
 * Database Schema:
 *
 * +----------------+          +---------------------+         +-------------------+
 * |    Merchant    |          |       Product       |         |    MerchantProduct|
 * +----------------+          +---------------------+         +-------------------+
 * | merchantId (PK)|1       M | productd (PK)          |     M   | merchantProductId |
 * | name           |<----------| merchantId (FK)     |<--------| merchantId (FK)   |
 * | ...            |          | name                |         | productId (FK)        |
 * +----------------+          | description         |         | dateAdded         |
 *                             | price               |         +-------------------+
 *                             | dateAdded           |
 *                             +---------------------+
 */


