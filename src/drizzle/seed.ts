import  db  from './db'; // Adjust this to your Drizzle DB client import
import {
  stateTable, cityTable, categoryTable, userTable, restaurantTable,
  restaurantOwnerTable, driverTable, addressTable, menuItemTable,
  ordersTable, statusCatalogTable, orderStatusTable, commentTable, orderMenuItemTable
} from './schema';

async function seed() {
  // 1. States
  const [state] = await db.insert(stateTable).values([
    { stateName: 'California', stateCode: 'CA' },
  ]).returning();

  // 2. Cities
  const [city] = await db.insert(cityTable).values([
    { cityName: 'Los Angeles', stateId: state.stateId },
  ]).returning();

  // 3. Categories
  const [category] = await db.insert(categoryTable).values([
    { categoryName: 'Pizza' },
  ]).returning();

  // 4. Users
  const [user] = await db.insert(userTable).values([
    {
      userName: 'John Doe',
      contactPhone: '1234567890',
      email: 'john@example.com',
      password: 'hashedpassword123'
    }
  ]).returning();

  // 5. Drivers
  const [driver] = await db.insert(driverTable).values([
    {
      carMake: 'Toyota',
      carModel: 'Corolla',
      carYear: 2019,
      userId: user.userId
    }
  ]).returning();

  // 6. Addresses
  const [address] = await db.insert(addressTable).values([
    {
      streetAddress1: '123 Sunset Blvd',
      zipCode: '90001',
      userId: user.userId,
      cityId: city.cityId
    }
  ]).returning();

  // 7. Restaurants
  const [restaurant] = await db.insert(restaurantTable).values([
    {
      restaurantName: 'Best Pizza',
      streetAddress: '456 Main St',
      zipCode: '90002',
      cityId: city.cityId
    }
  ]).returning();

  // 8. Restaurant Owners
  await db.insert(restaurantOwnerTable).values([
    {
      restaurantId: restaurant.restaurantId,
      ownerId: user.userId
    }
  ]);

  // 9. Menu Items
  const [menuItem] = await db.insert(menuItemTable).values([
    {
      menuName: 'Margherita Pizza',
      restaurantId: restaurant.restaurantId,
      categoryId: category.categoryId,
      description: 'Classic cheese pizza',
      ingredients: 'Tomato, Mozzarella, Basil',
      price: '12.99',
      active: true
    }
  ]).returning();

  // 10. Orders
  const [order] = await db.insert(ordersTable).values([
    {
      restaurantId: restaurant.restaurantId,
      estimatedDeliveryTime: new Date(Date.now() + 60 * 60 * 1000),
      deliveryAddressId: address.addressId,
      userId: user.userId,
      driverId: driver.driverId,
      price: '12.99',
      finalPrice: '12.99',
      //order_status: 'pending'
    }
  ]).returning();

  // 11. Status Catalog
  const [statusCatalog] = await db.insert(statusCatalogTable).values([
    { statusCatalogName: 'Pending' },
  ]).returning();

  // 12. Order Status
  await db.insert(orderStatusTable).values([
    {
      orderId: order.ordersId,
      statusCatalogId: statusCatalog.statusCatalogId
    }
  ]);

  // 13. Comment
  await db.insert(commentTable).values([
    {
      orderId: order.ordersId,
      userId: user.userId,
      commentText: 'Great food!',
      isPraise: true
    }
  ]);

  // 14. Order Menu Item
  await db.insert(orderMenuItemTable).values([
    {
      orderId: order.ordersId,
      menuItemId: menuItem.menuItemId,
      quantity: 1,
      itemPrice: '12.99',
      price: '12.99'
    }
  ]);

  console.log('✅ Seed complete!');
}

seed().catch((e) => {
  console.error('❌ Seed error:', e);
});
