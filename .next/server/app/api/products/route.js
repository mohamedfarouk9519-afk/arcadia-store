/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/products/route";
exports.ids = ["app/api/products/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

"use strict";
module.exports = require("@prisma/client");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "../app-render/work-async-storage.external":
/*!*****************************************************************************!*\
  !*** external "next/dist/server/app-render/work-async-storage.external.js" ***!
  \*****************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-async-storage.external.js");

/***/ }),

/***/ "./work-unit-async-storage.external":
/*!**********************************************************************************!*\
  !*** external "next/dist/server/app-render/work-unit-async-storage.external.js" ***!
  \**********************************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/server/app-render/work-unit-async-storage.external.js");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2Froute&page=%2Fapi%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Froute.ts&appDir=D%3A%5Cstore-launch-ready%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cstore-launch-ready&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2Froute&page=%2Fapi%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Froute.ts&appDir=D%3A%5Cstore-launch-ready%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cstore-launch-ready&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   workAsyncStorage: () => (/* binding */ workAsyncStorage),\n/* harmony export */   workUnitAsyncStorage: () => (/* binding */ workUnitAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/route-kind */ \"(rsc)/./node_modules/next/dist/server/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var D_store_launch_ready_app_api_products_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/products/route.ts */ \"(rsc)/./app/api/products/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/products/route\",\n        pathname: \"/api/products\",\n        filename: \"route\",\n        bundlePath: \"app/api/products/route\"\n    },\n    resolvedPagePath: \"D:\\\\store-launch-ready\\\\app\\\\api\\\\products\\\\route.ts\",\n    nextConfigOutput,\n    userland: D_store_launch_ready_app_api_products_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { workAsyncStorage, workUnitAsyncStorage, serverHooks } = routeModule;\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        workAsyncStorage,\n        workUnitAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIvaW5kZXguanM/bmFtZT1hcHAlMkZhcGklMkZwcm9kdWN0cyUyRnJvdXRlJnBhZ2U9JTJGYXBpJTJGcHJvZHVjdHMlMkZyb3V0ZSZhcHBQYXRocz0mcGFnZVBhdGg9cHJpdmF0ZS1uZXh0LWFwcC1kaXIlMkZhcGklMkZwcm9kdWN0cyUyRnJvdXRlLnRzJmFwcERpcj1EJTNBJTVDc3RvcmUtbGF1bmNoLXJlYWR5JTVDYXBwJnBhZ2VFeHRlbnNpb25zPXRzeCZwYWdlRXh0ZW5zaW9ucz10cyZwYWdlRXh0ZW5zaW9ucz1qc3gmcGFnZUV4dGVuc2lvbnM9anMmcm9vdERpcj1EJTNBJTVDc3RvcmUtbGF1bmNoLXJlYWR5JmlzRGV2PXRydWUmdHNjb25maWdQYXRoPXRzY29uZmlnLmpzb24mYmFzZVBhdGg9JmFzc2V0UHJlZml4PSZuZXh0Q29uZmlnT3V0cHV0PSZwcmVmZXJyZWRSZWdpb249Jm1pZGRsZXdhcmVDb25maWc9ZTMwJTNEISIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUErRjtBQUN2QztBQUNxQjtBQUNJO0FBQ2pGO0FBQ0E7QUFDQTtBQUNBLHdCQUF3Qix5R0FBbUI7QUFDM0M7QUFDQSxjQUFjLGtFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsc0RBQXNEO0FBQzlEO0FBQ0EsV0FBVyw0RUFBVztBQUN0QjtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQzBGOztBQUUxRiIsInNvdXJjZXMiOlsiIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFwcFJvdXRlUm91dGVNb2R1bGUgfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL3JvdXRlLWtpbmRcIjtcbmltcG9ydCB7IHBhdGNoRmV0Y2ggYXMgX3BhdGNoRmV0Y2ggfSBmcm9tIFwibmV4dC9kaXN0L3NlcnZlci9saWIvcGF0Y2gtZmV0Y2hcIjtcbmltcG9ydCAqIGFzIHVzZXJsYW5kIGZyb20gXCJEOlxcXFxzdG9yZS1sYXVuY2gtcmVhZHlcXFxcYXBwXFxcXGFwaVxcXFxwcm9kdWN0c1xcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvcHJvZHVjdHMvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9wcm9kdWN0c1wiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvcHJvZHVjdHMvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJEOlxcXFxzdG9yZS1sYXVuY2gtcmVhZHlcXFxcYXBwXFxcXGFwaVxcXFxwcm9kdWN0c1xcXFxyb3V0ZS50c1wiLFxuICAgIG5leHRDb25maWdPdXRwdXQsXG4gICAgdXNlcmxhbmRcbn0pO1xuLy8gUHVsbCBvdXQgdGhlIGV4cG9ydHMgdGhhdCB3ZSBuZWVkIHRvIGV4cG9zZSBmcm9tIHRoZSBtb2R1bGUuIFRoaXMgc2hvdWxkXG4vLyBiZSBlbGltaW5hdGVkIHdoZW4gd2UndmUgbW92ZWQgdGhlIG90aGVyIHJvdXRlcyB0byB0aGUgbmV3IGZvcm1hdC4gVGhlc2Vcbi8vIGFyZSB1c2VkIHRvIGhvb2sgaW50byB0aGUgcm91dGUuXG5jb25zdCB7IHdvcmtBc3luY1N0b3JhZ2UsIHdvcmtVbml0QXN5bmNTdG9yYWdlLCBzZXJ2ZXJIb29rcyB9ID0gcm91dGVNb2R1bGU7XG5mdW5jdGlvbiBwYXRjaEZldGNoKCkge1xuICAgIHJldHVybiBfcGF0Y2hGZXRjaCh7XG4gICAgICAgIHdvcmtBc3luY1N0b3JhZ2UsXG4gICAgICAgIHdvcmtVbml0QXN5bmNTdG9yYWdlXG4gICAgfSk7XG59XG5leHBvcnQgeyByb3V0ZU1vZHVsZSwgd29ya0FzeW5jU3RvcmFnZSwgd29ya1VuaXRBc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2Froute&page=%2Fapi%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Froute.ts&appDir=D%3A%5Cstore-launch-ready%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cstore-launch-ready&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(ssr)/./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true!":
/*!******************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-flight-client-entry-loader.js?server=true! ***!
  \******************************************************************************************************/
/***/ (() => {



/***/ }),

/***/ "(rsc)/./app/api/products/route.ts":
/*!***********************************!*\
  !*** ./app/api/products/route.ts ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var next_cache__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/cache */ \"(rsc)/./node_modules/next/cache.js\");\n/* harmony import */ var next_cache__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_cache__WEBPACK_IMPORTED_MODULE_1__);\n\n\nfunction slugify(text) {\n    return text.toLowerCase().trim().replace(/\\s+/g, \"-\").replace(/[^\\w-]+/g, \"\").replace(/--+/g, \"-\");\n}\nasync function POST(req) {\n    try {\n        const body = await req.json();\n        if (!body.name || !body.price) {\n            return Response.json({\n                error: \"اسم المنتج والسعر مطلوبان\"\n            }, {\n                status: 400\n            });\n        }\n        const firstCategory = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.category.findFirst({\n            orderBy: {\n                createdAt: \"asc\"\n            }\n        });\n        if (!firstCategory) {\n            return Response.json({\n                error: \"لا يوجد قسم متاح\"\n            }, {\n                status: 400\n            });\n        }\n        const lastProduct = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.product.findFirst({\n            orderBy: {\n                sortOrder: \"desc\"\n            }\n        });\n        const product = await _lib_prisma__WEBPACK_IMPORTED_MODULE_0__.prisma.product.create({\n            data: {\n                name: body.name,\n                slug: `${slugify(body.name)}-${Date.now()}`,\n                price: Number(body.price),\n                shortDescription: body.name,\n                description: body.name,\n                imageUrl: body.imageUrl || \"\",\n                galleryJson: \"[]\",\n                sizeGb: 0,\n                oldPrice: null,\n                isFeatured: false,\n                isActive: true,\n                stockStatus: \"available\",\n                sortOrder: (lastProduct?.sortOrder ?? 0) + 1,\n                categoryId: body.categoryId || firstCategory.id,\n                variants: {\n                    create: (body.variants || []).filter((v)=>v.sizeGb).map((v)=>({\n                            name: v.name || `نسخة ${v.sizeGb}GB`,\n                            price: Number(v.price || body.price),\n                            sizeGb: Number(v.sizeGb)\n                        }))\n                }\n            },\n            include: {\n                category: true,\n                variants: true\n            }\n        });\n        (0,next_cache__WEBPACK_IMPORTED_MODULE_1__.revalidatePath)(\"/\");\n        (0,next_cache__WEBPACK_IMPORTED_MODULE_1__.revalidatePath)(\"/product\");\n        (0,next_cache__WEBPACK_IMPORTED_MODULE_1__.revalidatePath)(`/product/${product.slug}`);\n        (0,next_cache__WEBPACK_IMPORTED_MODULE_1__.revalidatePath)(\"/admin/products\");\n        return Response.json(product);\n    } catch (error) {\n        console.error(\"PRODUCT_CREATE_ERROR:\", error);\n        return Response.json({\n            error: error?.message || error?.toString() || \"فشل إنشاء المنتج\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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LWxhdW5jaC1yZWFkeVxcYXBwXFxhcGlcXHByb2R1Y3RzXFxyb3V0ZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiQC9saWIvcHJpc21hXCI7XG5pbXBvcnQgeyByZXZhbGlkYXRlUGF0aCB9IGZyb20gXCJuZXh0L2NhY2hlXCI7XG5cbmZ1bmN0aW9uIHNsdWdpZnkodGV4dDogc3RyaW5nKSB7XG4gIHJldHVybiB0ZXh0XG4gICAgLnRvTG93ZXJDYXNlKClcbiAgICAudHJpbSgpXG4gICAgLnJlcGxhY2UoL1xccysvZywgXCItXCIpXG4gICAgLnJlcGxhY2UoL1teXFx3LV0rL2csIFwiXCIpXG4gICAgLnJlcGxhY2UoLy0tKy9nLCBcIi1cIik7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBQT1NUKHJlcTogUmVxdWVzdCkge1xuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXEuanNvbigpO1xuXG4gICAgaWYgKCFib2R5Lm5hbWUgfHwgIWJvZHkucHJpY2UpIHtcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcItin2LPZhSDYp9mE2YXZhtiq2Kwg2YjYp9mE2LPYudixINmF2LfZhNmI2KjYp9mGXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0Q2F0ZWdvcnkgPSBhd2FpdCBwcmlzbWEuY2F0ZWdvcnkuZmluZEZpcnN0KHtcbiAgICAgIG9yZGVyQnk6IHsgY3JlYXRlZEF0OiBcImFzY1wiIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoIWZpcnN0Q2F0ZWdvcnkpIHtcbiAgICAgIHJldHVybiBSZXNwb25zZS5qc29uKFxuICAgICAgICB7IGVycm9yOiBcItmE2Kcg2YrZiNis2K8g2YLYs9mFINmF2KrYp9itXCIgfSxcbiAgICAgICAgeyBzdGF0dXM6IDQwMCB9XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGxhc3RQcm9kdWN0ID0gYXdhaXQgcHJpc21hLnByb2R1Y3QuZmluZEZpcnN0KHtcbiAgICAgIG9yZGVyQnk6IHsgc29ydE9yZGVyOiBcImRlc2NcIiB9LFxuICAgIH0pO1xuXG4gICAgY29uc3QgcHJvZHVjdCA9IGF3YWl0IHByaXNtYS5wcm9kdWN0LmNyZWF0ZSh7XG4gIGRhdGE6IHtcbiAgICBuYW1lOiBib2R5Lm5hbWUsXG4gICAgc2x1ZzogYCR7c2x1Z2lmeShib2R5Lm5hbWUpfS0ke0RhdGUubm93KCl9YCxcbiAgICBwcmljZTogTnVtYmVyKGJvZHkucHJpY2UpLFxuICAgIHNob3J0RGVzY3JpcHRpb246IGJvZHkubmFtZSxcbiAgICBkZXNjcmlwdGlvbjogYm9keS5uYW1lLFxuICAgIGltYWdlVXJsOiBib2R5LmltYWdlVXJsIHx8IFwiXCIsXG4gICAgZ2FsbGVyeUpzb246IFwiW11cIixcbiAgICBzaXplR2I6IDAsXG4gICAgb2xkUHJpY2U6IG51bGwsXG4gICAgaXNGZWF0dXJlZDogZmFsc2UsXG4gICAgaXNBY3RpdmU6IHRydWUsXG4gICAgc3RvY2tTdGF0dXM6IFwiYXZhaWxhYmxlXCIsXG4gICAgc29ydE9yZGVyOiAobGFzdFByb2R1Y3Q/LnNvcnRPcmRlciA/PyAwKSArIDEsXG4gICAgY2F0ZWdvcnlJZDogYm9keS5jYXRlZ29yeUlkIHx8IGZpcnN0Q2F0ZWdvcnkuaWQsXG5cbiAgICB2YXJpYW50czoge1xuICAgICAgY3JlYXRlOiAoYm9keS52YXJpYW50cyB8fCBbXSlcbiAgICAgICAgLmZpbHRlcigodjogYW55KSA9PiB2LnNpemVHYilcbi5tYXAoKHY6IGFueSkgPT4gKHtcbiAgbmFtZTogdi5uYW1lIHx8IGDZhtiz2K7YqSAke3Yuc2l6ZUdifUdCYCxcbiAgcHJpY2U6IE51bWJlcih2LnByaWNlIHx8IGJvZHkucHJpY2UpLFxuICBzaXplR2I6IE51bWJlcih2LnNpemVHYiksXG59KSksXG4gICAgfSxcbiAgfSxcbiAgaW5jbHVkZToge1xuICAgIGNhdGVnb3J5OiB0cnVlLFxuICAgIHZhcmlhbnRzOiB0cnVlLFxuICB9LFxufSk7XG5cbiAgICByZXZhbGlkYXRlUGF0aChcIi9cIik7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvcHJvZHVjdFwiKTtcbiAgICByZXZhbGlkYXRlUGF0aChgL3Byb2R1Y3QvJHtwcm9kdWN0LnNsdWd9YCk7XG4gICAgcmV2YWxpZGF0ZVBhdGgoXCIvYWRtaW4vcHJvZHVjdHNcIik7XG5cbiAgICByZXR1cm4gUmVzcG9uc2UuanNvbihwcm9kdWN0KTtcbiAgfSBjYXRjaCAoZXJyb3I6IGFueSkge1xuICBjb25zb2xlLmVycm9yKFwiUFJPRFVDVF9DUkVBVEVfRVJST1I6XCIsIGVycm9yKTtcblxuICByZXR1cm4gUmVzcG9uc2UuanNvbihcbiAgICB7XG4gICAgICBlcnJvcjpcbiAgICAgICAgZXJyb3I/Lm1lc3NhZ2UgfHxcbiAgICAgICAgZXJyb3I/LnRvU3RyaW5nKCkgfHxcbiAgICAgICAgXCLZgdi02YQg2KXZhti02KfYoSDYp9mE2YXZhtiq2KxcIixcbiAgICB9LFxuICAgIHsgc3RhdHVzOiA1MDAgfVxuICApO1xufVxufSJdLCJuYW1lcyI6WyJwcmlzbWEiLCJyZXZhbGlkYXRlUGF0aCIsInNsdWdpZnkiLCJ0ZXh0IiwidG9Mb3dlckNhc2UiLCJ0cmltIiwicmVwbGFjZSIsIlBPU1QiLCJyZXEiLCJib2R5IiwianNvbiIsIm5hbWUiLCJwcmljZSIsIlJlc3BvbnNlIiwiZXJyb3IiLCJzdGF0dXMiLCJmaXJzdENhdGVnb3J5IiwiY2F0ZWdvcnkiLCJmaW5kRmlyc3QiLCJvcmRlckJ5IiwiY3JlYXRlZEF0IiwibGFzdFByb2R1Y3QiLCJwcm9kdWN0Iiwic29ydE9yZGVyIiwiY3JlYXRlIiwiZGF0YSIsInNsdWciLCJEYXRlIiwibm93IiwiTnVtYmVyIiwic2hvcnREZXNjcmlwdGlvbiIsImRlc2NyaXB0aW9uIiwiaW1hZ2VVcmwiLCJnYWxsZXJ5SnNvbiIsInNpemVHYiIsIm9sZFByaWNlIiwiaXNGZWF0dXJlZCIsImlzQWN0aXZlIiwic3RvY2tTdGF0dXMiLCJjYXRlZ29yeUlkIiwiaWQiLCJ2YXJpYW50cyIsImZpbHRlciIsInYiLCJtYXAiLCJpbmNsdWRlIiwiY29uc29sZSIsIm1lc3NhZ2UiLCJ0b1N0cmluZyJdLCJpZ25vcmVMaXN0IjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./app/api/products/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient({\n    log: [\n        \"query\"\n    ]\n});\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE4QztBQUU5QyxNQUFNQyxrQkFBa0JDO0FBSWpCLE1BQU1DLFNBQ1hGLGdCQUFnQkUsTUFBTSxJQUN0QixJQUFJSCx3REFBWUEsQ0FBQztJQUNmSSxLQUFLO1FBQUM7S0FBUTtBQUNoQixHQUFHO0FBRUwsSUFBSUMsSUFBcUMsRUFBRUosZ0JBQWdCRSxNQUFNLEdBQUdBIiwic291cmNlcyI6WyJEOlxcc3RvcmUtbGF1bmNoLXJlYWR5XFxsaWJcXHByaXNtYS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBQcmlzbWFDbGllbnQgfSBmcm9tIFwiQHByaXNtYS9jbGllbnRcIjtcclxuXHJcbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7XHJcbiAgcHJpc21hOiBQcmlzbWFDbGllbnQgfCB1bmRlZmluZWQ7XHJcbn07XHJcblxyXG5leHBvcnQgY29uc3QgcHJpc21hID1cclxuICBnbG9iYWxGb3JQcmlzbWEucHJpc21hID8/XHJcbiAgbmV3IFByaXNtYUNsaWVudCh7XHJcbiAgICBsb2c6IFtcInF1ZXJ5XCJdLFxyXG4gIH0pO1xyXG5cclxuaWYgKHByb2Nlc3MuZW52Lk5PREVfRU5WICE9PSBcInByb2R1Y3Rpb25cIikgZ2xvYmFsRm9yUHJpc21hLnByaXNtYSA9IHByaXNtYTsiXSwibmFtZXMiOlsiUHJpc21hQ2xpZW50IiwiZ2xvYmFsRm9yUHJpc21hIiwiZ2xvYmFsVGhpcyIsInByaXNtYSIsImxvZyIsInByb2Nlc3MiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader/index.js?name=app%2Fapi%2Fproducts%2Froute&page=%2Fapi%2Fproducts%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fproducts%2Froute.ts&appDir=D%3A%5Cstore-launch-ready%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=D%3A%5Cstore-launch-ready&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();