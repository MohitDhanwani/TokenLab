CREATE TABLE "tokens_instruction" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"mintAddress" varchar(255) NOT NULL,
	"ownerWallet" varchar(255) NOT NULL,
	"tokenName" varchar(100) NOT NULL,
	"tokenSymbol" varchar(20) NOT NULL,
	"decimals" integer NOT NULL,
	"initialSupply" bigint NOT NULL,
	"currentTotalSupply" bigint NOT NULL,
	"description" text NOT NULL,
	"mintAuthorityStatus" boolean DEFAULT false NOT NULL,
	"freezeAuthorityStatus" boolean DEFAULT false NOT NULL
);
