CREATE TABLE "public.orders" (
	"id" serial NOT NULL,
	"cakeId" integer NOT NULL,
	"clientId" integer NOT NULL,
	"quantity" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"totalPrice" numeric NOT NULL,
	"isDelivered" BOOLEAN NOT NULL DEFAULT 'false',
	CONSTRAINT "orders_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.clients" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	"phone" varchar(255) NOT NULL,
	"address" varchar(255) NOT NULL,
	CONSTRAINT "clients_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.cakes" (
	"id" serial NOT NULL,
	"image" varchar(255) NOT NULL UNIQUE,
	"name" varchar(255) NOT NULL UNIQUE,
	"flavourId" integer NOT NULL,
	"price" numeric NOT NULL,
	"description" TEXT NOT NULL,
	CONSTRAINT "cakes_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public.flavours" (
	"id" serial NOT NULL,
	"name" varchar(255) NOT NULL,
	CONSTRAINT "flavours_pk" PRIMARY KEY ("id")
) WITH (
  OIDS=FALSE
);



ALTER TABLE "orders" ADD CONSTRAINT "orders_fk0" FOREIGN KEY ("cakeId") REFERENCES "cakes"("id");
ALTER TABLE "orders" ADD CONSTRAINT "orders_fk1" FOREIGN KEY ("clientId") REFERENCES "clients"("id");


ALTER TABLE "cakes" ADD CONSTRAINT "cakes_fk0" FOREIGN KEY ("flavourId") REFERENCES "flavours"("id");





