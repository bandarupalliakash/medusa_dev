const dotenv = require("dotenv");

let ENV_FILE_NAME = "";
switch (process.env.NODE_ENV) {
  case "production":
    ENV_FILE_NAME = ".env.production";
    break;
  case "staging":
    ENV_FILE_NAME = ".env.staging";
    break;
  case "test":
    ENV_FILE_NAME = ".env.test";
    break;
  case "development":
  default:
    ENV_FILE_NAME = ".env";
    break;
}

try {
  dotenv.config({ path: process.cwd() + "/" + ENV_FILE_NAME });
} catch (e) {}

// CORS when consuming Medusa from admin
const ADMIN_CORS = process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";
  const BACKEND_URL = process.env.BACKEND_URL || "";
  const REDIS_URL = process.env.REDIS_URL || "";
  const OAuth2AuthorizationURL = process.env.OAUTH2_AUTH_URL || "";
  const OAuth2TokenURL = process.env.OAUTH2_TOKEN_URL || "";
  const OAuth2ClientId = process.env.OAUTH2_CLIENT_ID || "";
  const OAuth2ClientSecret = process.env.OAUTH2_CLIENT_SECRET || "";
  const OAuth2Scope = process.env.OAUTH2_SCOPE || "";
  const STORE_URL = process.env.STORE_URL || "";
  

const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,
  {
    resolve: `@medusajs/file-local`,
    options: {
      upload_dir: "uploads",
    },
  },
  {
    resolve: "@medusajs/admin",
    /** @type {import('@medusajs/admin').PluginOptions} */
    options: {
      autoRebuild: true,
      develop: {
        open: process.env.OPEN_BROWSER !== "false",
      },
    },
  },

// please do not disturb the above code as it includes the necessary configurations for the Medusa project. The following code is the configuration for the Medusa project. The configuration includes the necessary environment variables, CORS configurations, and plugins that are required for the project to run.
{
  resolve: `medusa-file-cloudinary`,
  options: {
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  },
},

// {
//   resolve: `medusa-plugin-slack-notification`,
//   options: {
//     show_discount_code: false,
//     slack_url: process.env.WEBHOOK_URL,
//     admin_orders_url: `http://admin/a/orders`,
//   },
// },

// {
//   resolve: "medusa-plugin-auth",
//   /** @type {import('medusa-plugin-auth').AuthOptions} */
//   options: [
//     {
//       type: "oauth2",
//       strict: "all",
//       identifier: "oauth2",
//       authorizationURL: OAuth2AuthorizationURL,
//       tokenURL: OAuth2TokenURL,
//       clientID: OAuth2ClientId,
//       clientSecret: OAuth2ClientSecret,
//       scope: OAuth2Scope.split(","),
//       // admin: {
//       //   callbackUrl: `${BACKEND_URL}/admin/auth/oauth2/cb`,
//       //   failureRedirect: `${ADMIN_URL}/login`,
//       //   successRedirect: `${ADMIN_URL}/`,
//       // },
//       store: {
//         callbackUrl: `${BACKEND_URL}/store/auth/oauth2/cb`,
//         failureRedirect: `${STORE_URL}/login`,
//         successRedirect: `${STORE_URL}/`,
//       },
//       parseProfile: (json) => {
//         const profile = {
//           provider: "google",
//           id: json.sub || json.id,
//           email: json.email,
//           name: {
//             familyName: json.family_name || json.familyName,
//             givenName: json.given_name || json.givenName,
//           },
//           emails: json.email
//             ? [
//                 {
//                   value: json.email,
//                 },
//               ]
//             : [],
//           phoneNumbers: json.phone_number
//             ? [
//                 {
//                   value: json.phone_number || "",
//                 },
//               ]
//             : [],
//           _json: json,
//         };

//         return profile;
//       },
//       validateProfile: (profile) => {
    
//         if (!profile.id || !profile.email) {
//           throw new Error("Invalid profile: ID and email are required.");
//         }

    
//         return profile;
//       },
//     },
 
//   ]
// }









];

const modules = {
 eventBus: {
    resolve: "@medusajs/event-bus-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
  cacheService: {
    resolve: "@medusajs/cache-redis",
    options: {
      redisUrl: REDIS_URL
    }
  },
};

/** @type {import('@medusajs/medusa').ConfigModule["projectConfig"]} */
const projectConfig = {
  jwt_secret: process.env.JWT_SECRET || "supersecret",
  cookie_secret: process.env.COOKIE_SECRET || "supersecret",
  store_cors: STORE_CORS,
  database_url: DATABASE_URL,
  admin_cors: ADMIN_CORS,
  // Uncomment the following lines to enable REDIS
  redis_url: REDIS_URL
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
};
