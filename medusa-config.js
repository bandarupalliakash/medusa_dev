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
const ADMIN_CORS =
  process.env.ADMIN_CORS || "http://localhost:7000,http://localhost:7001";

// CORS to avoid issues when consuming Medusa from a client
const STORE_CORS = process.env.STORE_CORS || "http://localhost:8000";

const DATABASE_URL =
  process.env.DATABASE_URL || "postgres://localhost/medusa-starter-default";
  const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:9000";
  const ADMIN_URL = process.env.ADMIN_URL || "http://localhost:7000";
  const STORE_URL = process.env.STORE_URL || "http://localhost:8000";

const REDIS_URL = process.env.REDIS_URL || "redis://localhost:6379";
const OAuth2AuthorizationURL = process.env.OAUTH2_AUTH_URL || "https://accounts.google.com/o/oauth2/auth";
const OAuth2TokenURL = process.env.OAUTH2_TOKEN_URL || "https://oauth2.googleapis.com/token";
const OAuth2ClientId = process.env.OAUTH2_CLIENT_ID || "60792650364-hl0eispq9t1f3je9mhqenpm3sc8rrvbe.apps.googleusercontent.com";
const OAuth2ClientSecret = process.env.OAUTH2_CLIENT_SECRET || "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";
const OAuth2Scope = process.env.OAUTH2_SCOPE || "profile,email";

const GoogleClientId = process.env.GOOGLE_CLIENT_ID || "274411885588-qe5dparpu670rho2la1sgosudofa1p08.apps.googleusercontent.com";
const GoogleClientSecret = process.env.GOOGLE_CLIENT_SECRET || "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";













const plugins = [
  `medusa-fulfillment-manual`,
  `medusa-payment-manual`,


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
  // {
  //   resolve: "nc-medusa-plugin-smtp",
  //   options: {
  //     fromEmail: "powrsofficial@gmail.com",
  //     transport: {
  //       host: "smtp.gmail.com",
  //       port: 465,
  //       secure: true, // Use SSL
  //       auth: {
  //         user: process.env.EMAIL_SENDER_ADDRESS,
  //         pass: process.env.EMAIL_SENDER_PASS,
  //       },
  //     },
  //     emailTemplatePath: "data/emails",
  //     templateMap: {
  //       "order.placed": "orderplaced",
  //     },
  //   },
  // },
  {
    resolve:`medusa-payment-razorpay`,
    options:{
         key_id: process.env.RAZORPAY_ID,
                key_secret: process.env.RAZORPAY_SECRET,
                razorpay_account: process.env.RAZORPAY_ACCOUNT,                
                automatic_expiry_period: 30, /*any value between 12 minutes and 30 days expressed in minutes*/
                manual_expiry_period: 20,
                refund_speed: "normal", 
                webhook_secret: process.env.RAZORPAY_WEBHOOK_SECRET,
                auto_capture: true
    }
  }, 
// {
//       resolve: "medusa-plugin-auth",
//       options: {
//         google: {
//           strict: "none",
//           identifier: "google",
//           clientID: GoogleClientId,
//           clientSecret: GoogleClientSecret,
//           admin: {
//             callbackUrl: `${BACKEND_URL}/admin/auth/google/cb`,
//             failureRedirect: `${ADMIN_URL}/login`,
//             successRedirect: `${ADMIN_URL}/`,
//           },
//           store: {
//             callbackUrl: `${BACKEND_URL}/store/auth/google/cb`,
//             failureRedirect: `${STORE_URL}/login`,
//             successRedirect: `${STORE_URL}/`,
//           }
//         }
//       }
//     },
 
// {
//   resolve: "medusa-plugin-auth",
//   /** @type {import('medusa-plugin-auth').AuthOptions} */
//   options: [
//     {
//       type: "oauth2",
//       strict: "all", // or "none" or "store" or "admin"
//       identifier: "oauth2",
//       authorizationURL: OAuth2AuthorizationURL,
//       tokenURL: OAuth2TokenURL,
//       clientID: OAuth2ClientId,
//       clientSecret: OAuth2ClientSecret,
//       scope: OAuth2Scope.split(","),
//       admin: {
//         callbackUrl: `${BACKEND_URL}/admin/auth/oauth2/cb`,
//         failureRedirect: `${ADMIN_URL}/login`,
//         successRedirect: `${ADMIN_URL}/`,
//       },
//       store: {
//         callbackUrl: `${BACKEND_URL}/store/auth/oauth2/cb`,
//         failureRedirect: `${STORE_URL}/login`,
//         successRedirect: `${STORE_URL}/`,
//       },
//        parseProfile: (json) => {
//         const profile = {
//             provider: "google",
//             id: json.id,
//             // username: json.username,
//             // displayName: json.global_name,
//             email: json.email,
//             name: {
//                 familyName: json.family_name,
//                 givenName: json.given_name
//             },
//             emails: json.email
//                 ? [
//                       {
//                           value: json.email
//                       }
//                   ]
//                 : [],
//             _json: json,
//             phoneNumbers: json.phone_number
//                 ? [
//                       {
//                           value: json.phone_number ?? ""
//                       }
//                   ]
//                 : []
//         };

//         return profile;
    
//       }
//     },
//     {
//       type: "google",
//       strict: "none", // or "all" or "store" or "admin"
//       identifier: "google",
//       clientID: GoogleClientId,
//       clientSecret: GoogleClientSecret,
//       admin: {
//         callbackUrl: `${BACKEND_URL}/admin/auth/google/cb`,
//         failureRedirect: `${ADMIN_URL}/login`,
//         successRedirect: `${ADMIN_URL}/`,
//       },
//       store: {
//         callbackUrl: `${BACKEND_URL}/store/auth/google/cb`,
//         failureRedirect: `${STORE_URL}/login`,
//         successRedirect: `${STORE_URL}/`,
//       }
//       // No parseProfile for Google as per your request
//     }
//   ]
// }

{
  resolve: "medusa-plugin-auth",
  /** @type {import('medusa-plugin-auth').AuthOptions} */
  options: [
    {
      type: "oauth2",
      strict: "all",
      identifier: "oauth2",
      authorizationURL: OAuth2AuthorizationURL,
      tokenURL: OAuth2TokenURL,
      clientID: OAuth2ClientId,
      clientSecret: OAuth2ClientSecret,
      scope: OAuth2Scope.split(","),
      admin: {
        callbackUrl: `${BACKEND_URL}/admin/auth/oauth2/cb`,
        failureRedirect: `${ADMIN_URL}/login`,
        successRedirect: `${ADMIN_URL}/`,
      },
      store: {
        callbackUrl: `${BACKEND_URL}/store/auth/oauth2/cb`,
        failureRedirect: `${STORE_URL}/login`,
        successRedirect: `${STORE_URL}/`,
      },
      parseProfile: (json) => {
        const profile = {
          provider: "google",
          id: json.sub || json.id,
          email: json.email,
          name: {
            familyName: json.family_name || json.familyName,
            givenName: json.given_name || json.givenName,
          },
          emails: json.email
            ? [
                {
                  value: json.email,
                },
              ]
            : [],
          phoneNumbers: json.phone_number
            ? [
                {
                  value: json.phone_number || "",
                },
              ]
            : [],
          _json: json,
        };

        return profile;
      },
      validateProfile: (profile) => {
    
        if (!profile.id || !profile.email) {
          throw new Error("Invalid profile: ID and email are required.");
        }

    
        return profile;
      },
    },
    {
      type: "google",
      strict: "none", 
      identifier: "google",
      clientID: GoogleClientId,
      clientSecret: GoogleClientSecret,
      admin: {
        callbackUrl: `${BACKEND_URL}/admin/auth/google/cb`,
        failureRedirect: `${ADMIN_URL}/login`,
        successRedirect: `${ADMIN_URL}/`,
      },
      store: {
        callbackUrl: `${BACKEND_URL}/store/auth/google/cb`,
        failureRedirect: `${STORE_URL}/login`,
        successRedirect: `${STORE_URL}/`,
      }
    }
  ]
}

,
  {
    resolve: `medusa-file-cloudinary`,
    options: {
      cloud_name: process.env.YOUR_CLOUD_NAME,
      api_key: process.env.YOUR_API_KEY,
      api_secret: process.env.YOUR_API_SECRET,
      secure: true,
    },
  },

{
  resolve: "@rsc-labs/medusa-store-analytics",
  options: {
      enableUI: true
  }
},

{
  resolve: "@rsc-labs/medusa-documents",
  options: {
      enableUI: true
  }
},


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
  redis_url: REDIS_URL,
 // worker_mode: process.env.MEDUSA_WORKER_MODE,
};

/** @type {import('@medusajs/medusa').ConfigModule} */
module.exports = {
  projectConfig,
  plugins,
  modules,
  eventBus: {
    subscribers: [
      
      // `${__dirname}/src/subscribers/order-placed`,
    ],
  },
};
