CREATE TABLE "user" (
  "id" int PRIMARY KEY,
  "email" varchar UNIQUE,
  "first_name" varchar,
  "last_name" varchar,
  "created" timestamp,
  "modified" timestamp
);

CREATE TABLE "order" (
  "id" int PRIMARY KEY,
  "created" timestamp,
  "modified" timestamp,
  "total" int,
  "status" varchar,
  "user_id" int
);

CREATE TABLE "product" (
  "id" int PRIMARY KEY,
  "name" varchar,
  "price" int,
  "descriptions" varchar,
  "created" timestamp,
  "modified" timestamp
);

CREATE TABLE "cart" (
  "id" int PRIMARY KEY,
  "created" timestamp,
  "modified" timestamp
);

CREATE TABLE "order_item" (
  "id" int PRIMARY KEY,
  "created" timestamp,
  "modified" timestamp,
  "qty" int,
  "price" int,
  "order_id" int,
  "product_id" int
);

CREATE TABLE "cart_item" (
  "id" int PRIMARY KEY,
  "created" timestamp,
  "modified" timestamp,
  "product_id" int,
  "cart_id" int
);

ALTER TABLE "order" ADD FOREIGN KEY ("user_id") REFERENCES "user" ("id");

CREATE TABLE "order_order_item" (
  "order_id" int NOT NULL,
  "order_item_order_id" int NOT NULL,
  PRIMARY KEY ("order_id", "order_item_order_id")
);

ALTER TABLE "order_order_item" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "order_order_item" ADD FOREIGN KEY ("order_item_order_id") REFERENCES "order_item" ("order_id");


CREATE TABLE "product_order_item" (
  "product_id" int NOT NULL,
  "order_item_product_id" int NOT NULL,
  PRIMARY KEY ("product_id", "order_item_product_id")
);

ALTER TABLE "product_order_item" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "product_order_item" ADD FOREIGN KEY ("order_item_product_id") REFERENCES "order_item" ("product_id");


CREATE TABLE "product_cart_item" (
  "product_id" int NOT NULL,
  "cart_item_product_id" int NOT NULL,
  PRIMARY KEY ("product_id", "cart_item_product_id")
);

ALTER TABLE "product_cart_item" ADD FOREIGN KEY ("product_id") REFERENCES "product" ("id");

ALTER TABLE "product_cart_item" ADD FOREIGN KEY ("cart_item_product_id") REFERENCES "cart_item" ("product_id");


CREATE TABLE "cart_cart_item" (
  "cart_id" int NOT NULL,
  "cart_item_cart_id" int NOT NULL,
  PRIMARY KEY ("cart_id", "cart_item_cart_id")
);

ALTER TABLE "cart_cart_item" ADD FOREIGN KEY ("cart_id") REFERENCES "cart" ("id");

ALTER TABLE "cart_cart_item" ADD FOREIGN KEY ("cart_item_cart_id") REFERENCES "cart_item" ("cart_id");

