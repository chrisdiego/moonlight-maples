module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var chunk = require("./" + "" + chunkId + "." + hotCurrentHash + ".hot-update.js");
/******/ 		hotAddUpdateChunk(chunk.id, chunk.modules);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest() {
/******/ 		try {
/******/ 			var update = require("./" + "" + hotCurrentHash + ".hot-update.json");
/******/ 		} catch (e) {
/******/ 			return Promise.resolve();
/******/ 		}
/******/ 		return Promise.resolve(update);
/******/ 	}
/******/
/******/ 	//eslint-disable-next-line no-unused-vars
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "61f915ecb50b5cee83e2";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "main";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "http://localhost:3001/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./build/assets.json":
/*!***************************!*\
  !*** ./build/assets.json ***!
  \***************************/
/*! exports provided: client, , default */
/***/ (function(module) {

module.exports = {"client":{"js":"http://localhost:3001/static/js/bundle.js"},"":{"jpg":["http://localhost:3001/static/media/image1.991d2eed.jpg","http://localhost:3001/static/media/info-highlight.d6752937.jpg","http://localhost:3001/static/media/maple-leaf.d5c9ddd7.jpg"],"svg":"http://localhost:3001/static/media/maples-logo.2bea19e5.svg"}};

/***/ }),

/***/ "./node_modules/webpack/hot/log-apply-result.js":
/*!*****************************************!*\
  !*** (webpack)/hot/log-apply-result.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
module.exports = function(updatedModules, renewedModules) {
	var unacceptedModules = updatedModules.filter(function(moduleId) {
		return renewedModules && renewedModules.indexOf(moduleId) < 0;
	});
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	if (unacceptedModules.length > 0) {
		log(
			"warning",
			"[HMR] The following modules couldn't be hot updated: (They would need a full reload!)"
		);
		unacceptedModules.forEach(function(moduleId) {
			log("warning", "[HMR]  - " + moduleId);
		});
	}

	if (!renewedModules || renewedModules.length === 0) {
		log("info", "[HMR] Nothing hot updated.");
	} else {
		log("info", "[HMR] Updated modules:");
		renewedModules.forEach(function(moduleId) {
			if (typeof moduleId === "string" && moduleId.indexOf("!") !== -1) {
				var parts = moduleId.split("!");
				log.groupCollapsed("info", "[HMR]  - " + parts.pop());
				log("info", "[HMR]  - " + moduleId);
				log.groupEnd("info");
			} else {
				log("info", "[HMR]  - " + moduleId);
			}
		});
		var numberIds = renewedModules.every(function(moduleId) {
			return typeof moduleId === "number";
		});
		if (numberIds)
			log(
				"info",
				"[HMR] Consider using the NamedModulesPlugin for module names."
			);
	}
};


/***/ }),

/***/ "./node_modules/webpack/hot/log.js":
/*!****************************!*\
  !*** (webpack)/hot/log.js ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {

var logLevel = "info";

function dummy() {}

function shouldLog(level) {
	var shouldLog =
		(logLevel === "info" && level === "info") ||
		(["info", "warning"].indexOf(logLevel) >= 0 && level === "warning") ||
		(["info", "warning", "error"].indexOf(logLevel) >= 0 && level === "error");
	return shouldLog;
}

function logGroup(logFn) {
	return function(level, msg) {
		if (shouldLog(level)) {
			logFn(msg);
		}
	};
}

module.exports = function(level, msg) {
	if (shouldLog(level)) {
		if (level === "info") {
			console.log(msg);
		} else if (level === "warning") {
			console.warn(msg);
		} else if (level === "error") {
			console.error(msg);
		}
	}
};

/* eslint-disable node/no-unsupported-features/node-builtins */
var group = console.group || dummy;
var groupCollapsed = console.groupCollapsed || dummy;
var groupEnd = console.groupEnd || dummy;
/* eslint-enable node/no-unsupported-features/node-builtins */

module.exports.group = logGroup(group);

module.exports.groupCollapsed = logGroup(groupCollapsed);

module.exports.groupEnd = logGroup(groupEnd);

module.exports.setLogLevel = function(level) {
	logLevel = level;
};


/***/ }),

/***/ "./node_modules/webpack/hot/poll.js?300":
/*!*********************************!*\
  !*** (webpack)/hot/poll.js?300 ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(__resourceQuery) {/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
/*globals __resourceQuery */
if (true) {
	var hotPollInterval = +__resourceQuery.substr(1) || 10 * 60 * 1000;
	var log = __webpack_require__(/*! ./log */ "./node_modules/webpack/hot/log.js");

	var checkForUpdate = function checkForUpdate(fromUpdate) {
		if (module.hot.status() === "idle") {
			module.hot
				.check(true)
				.then(function(updatedModules) {
					if (!updatedModules) {
						if (fromUpdate) log("info", "[HMR] Update applied.");
						return;
					}
					__webpack_require__(/*! ./log-apply-result */ "./node_modules/webpack/hot/log-apply-result.js")(updatedModules, updatedModules);
					checkForUpdate(true);
				})
				.catch(function(err) {
					var status = module.hot.status();
					if (["abort", "fail"].indexOf(status) >= 0) {
						log("warning", "[HMR] Cannot apply update.");
						log("warning", "[HMR] " + (err.stack || err.message));
						log("warning", "[HMR] You need to restart the application!");
					} else {
						log(
							"warning",
							"[HMR] Update failed: " + (err.stack || err.message)
						);
					}
				});
		}
	};
	setInterval(checkForUpdate, hotPollInterval);
} else {}

/* WEBPACK VAR INJECTION */}.call(this, "?300"))

/***/ }),

/***/ "./src/AboutPage.jsx":
/*!***************************!*\
  !*** ./src/AboutPage.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Card */ "@material-ui/core/Card");
/* harmony import */ var _material_ui_core_Card__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Card__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/CardContent */ "@material-ui/core/CardContent");
/* harmony import */ var _material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_CardContent__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _AboutPageRow__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./AboutPageRow */ "./src/AboutPageRow.jsx");
/* harmony import */ var _images_image1_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/image1.jpg */ "./src/images/image1.jpg");
/* harmony import */ var _images_image1_jpg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_images_image1_jpg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _AboutPage_scss__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./AboutPage.scss */ "./src/AboutPage.scss");
/* harmony import */ var _AboutPage_scss__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_AboutPage_scss__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _content_aboutPageRows__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./content/aboutPageRows */ "./src/content/aboutPageRows.js");
var _jsxFileName = "/home/chris/git/moonlight-maples/src/AboutPage.jsx";










var AboutPage = function AboutPage() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "container-1600",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "mb-4 shadow-lg",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    sm: "12",
    className: "about-header-image mt-md-5 align-items-center d-flex",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: "h1",
    variant: "h3",
    className: "w-100 text-center p-4 text-white",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, "About Us"))), _content_aboutPageRows__WEBPACK_IMPORTED_MODULE_8__["default"].map(function (row, i) {
    return (//'alternate' swaps the order of the image/text for each row.  If it's even/0 index, image on left, if it's odd image on right
      react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_AboutPageRow__WEBPACK_IMPORTED_MODULE_5__["default"], {
        imageSrc: row.imageSrc,
        imageAlt: row.imageAlt,
        contentTitle: row.contentTitle,
        contentText: row.contentText,
        alternate: i % 2 == 0 || i == 0 ? true : false,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      })
    );
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (AboutPage);

/***/ }),

/***/ "./src/AboutPage.scss":
/*!****************************!*\
  !*** ./src/AboutPage.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/AboutPageRow.jsx":
/*!******************************!*\
  !*** ./src/AboutPageRow.jsx ***!
  \******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _images_image1_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/image1.jpg */ "./src/images/image1.jpg");
/* harmony import */ var _images_image1_jpg__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_images_image1_jpg__WEBPACK_IMPORTED_MODULE_3__);
var _jsxFileName = "/home/chris/git/moonlight-maples/src/AboutPageRow.jsx";





var AboutPageRow = function AboutPageRow(_ref) {
  var imageSrc = _ref.imageSrc,
      imageAlt = _ref.imageAlt,
      contentTitle = _ref.contentTitle,
      contentText = _ref.contentText,
      alternate = _ref.alternate;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "mb-5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    sm: {
      size: 6,
      order: alternate ? 1 : 2
    },
    className: "about-page-row-image p-0 pr-md-5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    className: "mw-100 shadow-md",
    src: imageSrc,
    alt: imageAlt,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    sm: {
      size: 6,
      order: alternate ? 2 : 1
    },
    className: "about-page-row-content p-0 pl-md-5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: "h2",
    variant: "h5",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, contentTitle), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
    variant: "subtitle1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, contentText)), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (AboutPageRow);

/***/ }),

/***/ "./src/App.jsx":
/*!*********************!*\
  !*** ./src/App.jsx ***!
  \*********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./Header */ "./src/Header.jsx");
/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./Footer */ "./src/Footer.jsx");
/* harmony import */ var _IndexPage__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./IndexPage */ "./src/IndexPage.jsx");
/* harmony import */ var _AboutPage__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./AboutPage */ "./src/AboutPage.jsx");
/* harmony import */ var _ProductsPage__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./ProductsPage */ "./src/ProductsPage.js");
/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./App.scss */ "./src/App.scss");
/* harmony import */ var _App_scss__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_App_scss__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @fortawesome/fontawesome-svg-core */ "@fortawesome/fontawesome-svg-core");
/* harmony import */ var _fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @fortawesome/free-solid-svg-icons */ "@fortawesome/free-solid-svg-icons");
/* harmony import */ var _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_14__);





var _jsxFileName = "/home/chris/git/moonlight-maples/src/App.jsx";











_fortawesome_fontawesome_svg_core__WEBPACK_IMPORTED_MODULE_13__["library"].add(_fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_14__["fas"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_14__["faEnvelope"], _fortawesome_free_solid_svg_icons__WEBPACK_IMPORTED_MODULE_14__["faPhone"]);

var App =
/*#__PURE__*/
function (_Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_4___default()(App, _Component);

  function App() {
    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, App);

    return _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(App).apply(this, arguments));
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(App, [{
    key: "render",
    value: function render() {
      return react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement("div", {
        className: "App",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 18
        }
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Header__WEBPACK_IMPORTED_MODULE_7__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 19
        }
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Switch"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 20
        }
      }, react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/",
        exact: true,
        component: _IndexPage__WEBPACK_IMPORTED_MODULE_9__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 21
        }
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/about",
        component: _AboutPage__WEBPACK_IMPORTED_MODULE_10__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 22
        }
      }), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_6__["Route"], {
        path: "/products",
        component: _ProductsPage__WEBPACK_IMPORTED_MODULE_11__["default"],
        __source: {
          fileName: _jsxFileName,
          lineNumber: 23
        }
      })), react__WEBPACK_IMPORTED_MODULE_5___default.a.createElement(_Footer__WEBPACK_IMPORTED_MODULE_8__["default"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 25
        }
      }));
    }
  }]);

  return App;
}(react__WEBPACK_IMPORTED_MODULE_5__["Component"]);

/* harmony default export */ __webpack_exports__["default"] = (App);

/***/ }),

/***/ "./src/App.scss":
/*!**********************!*\
  !*** ./src/App.scss ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/FeaturedProducts.jsx":
/*!**********************************!*\
  !*** ./src/FeaturedProducts.jsx ***!
  \**********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _Product__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Product */ "./src/Product.js");
/* harmony import */ var _content_products__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./content/products */ "./src/content/products.js");
var _jsxFileName = "/home/chris/git/moonlight-maples/src/FeaturedProducts.jsx";






var featuredProducts = function featuredProducts() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "mb-4 featured-products mx-auto",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, _content_products__WEBPACK_IMPORTED_MODULE_4__["default"].map(function (product) {
    return product.sizes.filter(function (x) {
      return x.featured;
    }).map(function (size) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        sm: "3",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 14
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Product__WEBPACK_IMPORTED_MODULE_3__["default"], {
        product: product,
        size: size,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 15
        }
      }));
    });
  }));
};

/* harmony default export */ __webpack_exports__["default"] = (featuredProducts);

/***/ }),

/***/ "./src/Footer.jsx":
/*!************************!*\
  !*** ./src/Footer.jsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _LinkList__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./LinkList */ "./src/LinkList.jsx");
/* harmony import */ var _content_linksLists_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./content/linksLists.js */ "./src/content/linksLists.js");
var _jsxFileName = "/home/chris/git/moonlight-maples/src/Footer.jsx";






var Footer = function Footer() {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    fluid: true,
    className: "bg-secondary p-4 shadow-lg text-center",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    sm: {
      offset: 3,
      size: 3
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LinkList__WEBPACK_IMPORTED_MODULE_3__["default"], {
    footerLinks: _content_linksLists_js__WEBPACK_IMPORTED_MODULE_4__["sitemapLinks"],
    subtitle: "Sitemap",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    sm: {
      size: 3
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_LinkList__WEBPACK_IMPORTED_MODULE_3__["default"], {
    footerLinks: _content_linksLists_js__WEBPACK_IMPORTED_MODULE_4__["contactLinks"],
    subtitle: "Contact",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
    variant: "body1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, "\xA9 2018 Moonlight Maples, all rights reserved", ' ', react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }), "Site by Chris Diego"))));
};

/* harmony default export */ __webpack_exports__["default"] = (Footer);

/***/ }),

/***/ "./src/Header.jsx":
/*!************************!*\
  !*** ./src/Header.jsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return Header; });
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/classCallCheck */ "@babel/runtime/helpers/classCallCheck");
/* harmony import */ var _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/createClass */ "@babel/runtime/helpers/createClass");
/* harmony import */ var _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/possibleConstructorReturn */ "@babel/runtime/helpers/possibleConstructorReturn");
/* harmony import */ var _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @babel/runtime/helpers/getPrototypeOf */ "@babel/runtime/helpers/getPrototypeOf");
/* harmony import */ var _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @babel/runtime/helpers/assertThisInitialized */ "@babel/runtime/helpers/assertThisInitialized");
/* harmony import */ var _babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @babel/runtime/helpers/inherits */ "@babel/runtime/helpers/inherits");
/* harmony import */ var _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_10___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_10__);
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! react-transition-group */ "react-transition-group");
/* harmony import */ var react_transition_group__WEBPACK_IMPORTED_MODULE_11___default = /*#__PURE__*/__webpack_require__.n(react_transition_group__WEBPACK_IMPORTED_MODULE_11__);
/* harmony import */ var _images_logo_text_png__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./images/logo-text.png */ "./src/images/logo-text.png");
/* harmony import */ var _images_logo_text_png__WEBPACK_IMPORTED_MODULE_12___default = /*#__PURE__*/__webpack_require__.n(_images_logo_text_png__WEBPACK_IMPORTED_MODULE_12__);
/* harmony import */ var _images_maples_logo_svg__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./images/maples-logo.svg */ "./src/images/maples-logo.svg");
/* harmony import */ var _images_maples_logo_svg__WEBPACK_IMPORTED_MODULE_13___default = /*#__PURE__*/__webpack_require__.n(_images_maples_logo_svg__WEBPACK_IMPORTED_MODULE_13__);
/* harmony import */ var _Header_scss__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./Header.scss */ "./src/Header.scss");
/* harmony import */ var _Header_scss__WEBPACK_IMPORTED_MODULE_14___default = /*#__PURE__*/__webpack_require__.n(_Header_scss__WEBPACK_IMPORTED_MODULE_14__);
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @fortawesome/react-fontawesome */ "@fortawesome/react-fontawesome");
/* harmony import */ var _fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_15__);






var _jsxFileName = "/home/chris/git/moonlight-maples/src/Header.jsx";











var Header =
/*#__PURE__*/
function (_React$Component) {
  _babel_runtime_helpers_inherits__WEBPACK_IMPORTED_MODULE_5___default()(Header, _React$Component);

  function Header(props) {
    var _this;

    _babel_runtime_helpers_classCallCheck__WEBPACK_IMPORTED_MODULE_0___default()(this, Header);

    _this = _babel_runtime_helpers_possibleConstructorReturn__WEBPACK_IMPORTED_MODULE_2___default()(this, _babel_runtime_helpers_getPrototypeOf__WEBPACK_IMPORTED_MODULE_3___default()(Header).call(this, props));
    _this.state = {
      isOpen: false,
      fullHeader: true
    };
    _this.toggle = _this.toggle.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    _this.shrinkHeader = _this.shrinkHeader.bind(_babel_runtime_helpers_assertThisInitialized__WEBPACK_IMPORTED_MODULE_4___default()(_this));
    return _this;
  }

  _babel_runtime_helpers_createClass__WEBPACK_IMPORTED_MODULE_1___default()(Header, [{
    key: "toggle",
    value: function toggle() {
      this.setState(function (state) {
        return {
          isOpen: !state.isOpen
        };
      });
    }
  }, {
    key: "shrinkHeader",
    value: function shrinkHeader() {
      var distFromTop = window.pageYOffset,
          navbarHeight = document.getElementsByClassName('navbar')[0].offsetHeight;

      if (distFromTop > navbarHeight) {
        this.setState({
          fullHeader: false
        });
      } else {
        this.setState({
          fullHeader: true
        });
      }
    }
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      var screenWidth = window.matchMedia("(min-width: 768px)");

      if (screenWidth.matches) {
        window.addEventListener('scroll', this.shrinkHeader);
      }
    }
  }, {
    key: "render",
    value: function render() {
      var _this$state = this.state,
          fullHeader = _this$state.fullHeader,
          isOpen = _this$state.isOpen;
      return react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["Navbar"], {
        onScroll: this.toggle,
        className: "bg-primary shadow-lg sticky-top header-state-".concat(fullHeader ? 'open' : 'closed'),
        light: true,
        expand: "md",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 67
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["NavbarBrand"], {
        href: "/",
        className: "m-0 p-0 d-md-none",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 68
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
        className: "header-logo",
        src: _images_maples_logo_svg__WEBPACK_IMPORTED_MODULE_13___default.a,
        height: "80vh",
        alt: "Moonlight Maples Logo",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 69
        }
      })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["NavbarToggler"], {
        onClick: this.toggle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 71
        }
      }), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["Container"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 72
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["Collapse"], {
        isOpen: isOpen,
        navbar: true,
        className: "justify-content-between mt-2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 73
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["Nav"], {
        navbar: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 74
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["NavItem"], {
        className: "pr-2",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 75
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["NavLink"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 76
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__["Link"], {
        to: "/products",
        onClick: this.toggle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 77
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {
        variant: "contained",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 78
        }
      }, "Shop Products")))), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["NavItem"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 84
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["NavLink"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 85
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_9__["Link"], {
        to: "/about",
        onClick: this.toggle,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 86
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_7___default.a, {
        variant: "outlined",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 87
        }
      }, "About Us"))))), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["NavbarBrand"], {
        href: "/",
        className: "m-0 d-none d-md-block",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 94
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("img", {
        className: "header-logo",
        src: _images_maples_logo_svg__WEBPACK_IMPORTED_MODULE_13___default.a,
        alt: "Moonlight Maples Logo",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 95
        }
      })), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["Nav"], {
        className: "flex-column mr-md-5",
        navbar: true,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 97
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["NavItem"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 98
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
        className: "text-dark",
        href: "mailto:moonlightmaples@yahoo.com",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 99
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
        variant: "subtitle1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 100
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_15__["FontAwesomeIcon"], {
        icon: "envelope",
        className: "mx-2",
        size: "md",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 101
        }
      }), "moonlightmaples@yahoo.com"))), react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_10__["NavItem"], {
        __source: {
          fileName: _jsxFileName,
          lineNumber: 106
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement("a", {
        className: "text-dark",
        href: "tel:8025982317",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 107
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_8___default.a, {
        variant: "subtitle1",
        component: "h1",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 108
        }
      }, react__WEBPACK_IMPORTED_MODULE_6___default.a.createElement(_fortawesome_react_fontawesome__WEBPACK_IMPORTED_MODULE_15__["FontAwesomeIcon"], {
        icon: "phone",
        className: "mx-2",
        size: "md",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 109
        }
      }), "(802) 598-2317")))))));
    }
  }]);

  return Header;
}(react__WEBPACK_IMPORTED_MODULE_6___default.a.Component);



/***/ }),

/***/ "./src/Header.scss":
/*!*************************!*\
  !*** ./src/Header.scss ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/IndexPage.jsx":
/*!***************************!*\
  !*** ./src/IndexPage.jsx ***!
  \***************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @material-ui/core/Hidden */ "@material-ui/core/Hidden");
/* harmony import */ var _material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _FeaturedProducts__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./FeaturedProducts */ "./src/FeaturedProducts.jsx");
/* harmony import */ var _images_image1_jpg__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./images/image1.jpg */ "./src/images/image1.jpg");
/* harmony import */ var _images_image1_jpg__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_images_image1_jpg__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var _images_info_highlight_jpg__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./images/info-highlight.jpg */ "./src/images/info-highlight.jpg");
/* harmony import */ var _images_info_highlight_jpg__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(_images_info_highlight_jpg__WEBPACK_IMPORTED_MODULE_7__);
/* harmony import */ var _images_maples_logo_svg__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./images/maples-logo.svg */ "./src/images/maples-logo.svg");
/* harmony import */ var _images_maples_logo_svg__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(_images_maples_logo_svg__WEBPACK_IMPORTED_MODULE_8__);
/* harmony import */ var _indexPage_scss__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./indexPage.scss */ "./src/indexPage.scss");
/* harmony import */ var _indexPage_scss__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(_indexPage_scss__WEBPACK_IMPORTED_MODULE_9__);
var _jsxFileName = "/home/chris/git/moonlight-maples/src/IndexPage.jsx";











var IndexPage = function IndexPage(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    fluid: true,
    className: "text-center p-0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "m-0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    className: "p-0 background-image shadow mb-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Jumbotron"], {
    className: "w-100 py-0 text-center h-100 d-flex",
    style: {
      backgroundColor: 'transparent'
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    className: "m-auto",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Container"], {
    className: "rounded p-4 bg-secondary",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 22
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
    component: "h2",
    variant: "h4",
    gutterBottom: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 23
    }
  }, "Serving the Vermont region and beyond with handcrafted maple products since 1999"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("hr", {
    className: "my-2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_3___default.a, {
    variant: "contained",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }, "Explore our Products")))))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "m-0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 33
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_FeaturedProducts__WEBPACK_IMPORTED_MODULE_5__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    }
  })), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    className: "m-0",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    style: {
      zIndex: '2'
    },
    className: "rounded p-4 bg-white shadow-lg intro-highlight position-relative",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 38
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 39
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    xs: {
      order: 2
    },
    sm: {
      size: 5,
      offset: 2,
      order: 1
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 40
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_4___default.a, {
    only: "xs",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 41
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
    variant: "h4",
    gutterBottom: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 42
    }
  }, "Who we are")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
    variant: "body1",
    align: "left",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 46
    }
  }, "Maple syrup is a syrup usually made from the xylem sap of sugar maple, red maple, or black maple trees, although it can also be made from other maple species. In cold climates, these trees store starch in their trunks and roots before winter; the starch is then converted to sugar that rises in the sap in late winter and early spring. Maple trees are tapped by drilling holes into their trunks and collecting the exuded sap, which is processed by heating to evaporate much of the water, leaving the concentrated syrup.", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 48
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 49
    }
  }), "Maple syrup was first collected and used by the indigenous peoples of North America, and the practice was adopted by European settlers, who gradually refined production methods. Technological improvements in the 1970s further refined syrup processing. The Canadian province of Quebec is by far the largest producer, responsible for 70 percent of the world's output; Canadian exports of maple syrup in 2016 were C$ 487 million (about US$ 360 million), with Quebec accounting for some 90 percent of this total.")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    xs: {
      order: 1
    },
    sm: {
      size: 3,
      order: 2
    },
    __source: {
      fileName: _jsxFileName,
      lineNumber: 53
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Hidden__WEBPACK_IMPORTED_MODULE_4___default.a, {
    smUp: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 54
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
    variant: "h4",
    gutterBottom: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 55
    }
  }, "Who we are")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("img", {
    src: _images_info_highlight_jpg__WEBPACK_IMPORTED_MODULE_7___default.a,
    width: "300",
    className: "rounded",
    alt: "",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 59
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
    className: "mt-2",
    variant: "caption",
    gutterBottom: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 60
    }
  }, "Robbie Morrill and Ruth Chiappinelli", react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("br", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 62
    }
  }), ' ', "Maple King & Queen, 2010")))))));
};

/* harmony default export */ __webpack_exports__["default"] = (IndexPage);

/***/ }),

/***/ "./src/LinkList.jsx":
/*!**************************!*\
  !*** ./src/LinkList.jsx ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/chris/git/moonlight-maples/src/LinkList.jsx";




var LinkList = function LinkList(props) {
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("div", {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 6
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
    className: "mb-2",
    variant: "subtitle1",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, props.subtitle), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroup"], {
    flush: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_2___default.a, {
    variant: "subtitle2",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, props.footerLinks.map(function (link) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["ListGroupItem"], {
      tag: "a",
      className: "bg-secondary",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 13
      }
    }, link.iconClasses ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("i", {
      className: link.iconClasses,
      __source: {
        fileName: _jsxFileName,
        lineNumber: 14
      }
    }) : null, link.label);
  }))));
};

/* harmony default export */ __webpack_exports__["default"] = (LinkList);

/***/ }),

/***/ "./src/Product.js":
/*!************************!*\
  !*** ./src/Product.js ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @material-ui/core/Button */ "@material-ui/core/Button");
/* harmony import */ var _material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/chris/git/moonlight-maples/src/Product.js";




var Product = function Product(_ref) {
  var product = _ref.product,
      size = _ref.size,
      featured = _ref.featured;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Card"], {
    className: "shadow-md mb-3 rounded text-center",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardImg"], {
    top: true,
    width: "100%",
    src: product.mainImage,
    alt: "Maple Syrup",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardBody"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 11
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardTitle"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, product.name), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardSubtitle"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, "$", size.price), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["CardText"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, size.quantity), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Button__WEBPACK_IMPORTED_MODULE_2___default.a, {
    variant: "contained",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }, "View")));
};

/* harmony default export */ __webpack_exports__["default"] = (Product);

/***/ }),

/***/ "./src/ProductsFilters.js":
/*!********************************!*\
  !*** ./src/ProductsFilters.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @material-ui/core/Typography */ "@material-ui/core/Typography");
/* harmony import */ var _material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_2__);
var _jsxFileName = "/home/chris/git/moonlight-maples/src/ProductsFilters.js";




var ProductsFilters = function ProductsFilters(_ref) {
  var updateProducts = _ref.updateProducts,
      products = _ref.products,
      filters = _ref.filters,
      updateField = _ref.updateField;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: "2",
    className: "my-4 products-filters border-right",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    className: "mb-4",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: "12",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 9
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: "h5",
    variant: "h5",
    gutterBottom: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 10
    }
  }, "Price")), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: "6",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 12
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 13
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroupAddon"], {
    addonType: "prepend",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 14
    }
  }, "$"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Input"], {
    type: "number",
    placeholder: "Min",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 15
    }
  }))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: "6",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 18
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroup"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 19
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["InputGroupAddon"], {
    addonType: "prepend",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 20
    }
  }, "$"), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Input"], {
    type: "number",
    placeholder: "Max",
    name: "maxPrice",
    onChange: updateField,
    value: filters.maxPrice,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 21
    }
  })))), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 25
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
    sm: "12",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 26
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_material_ui_core_Typography__WEBPACK_IMPORTED_MODULE_1___default.a, {
    component: "h5",
    variant: "h5",
    gutterBottom: true,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 27
    }
  }, "Type")), products.map(function (product) {
    return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_2__["Col"], {
      sm: "12",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 31
      }
    }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("input", {
      type: "checkbox",
      checked: filters.types.includes(product.name),
      onChange: updateField,
      name: product.name,
      className: "mr-2",
      __source: {
        fileName: _jsxFileName,
        lineNumber: 32
      }
    }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement("label", {
      __source: {
        fileName: _jsxFileName,
        lineNumber: 33
      }
    }, product.name));
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (ProductsFilters);

/***/ }),

/***/ "./src/ProductsList.js":
/*!*****************************!*\
  !*** ./src/ProductsList.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _Product__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Product */ "./src/Product.js");
var _jsxFileName = "/home/chris/git/moonlight-maples/src/ProductsList.js";




var ProductsList = function ProductsList(_ref) {
  var products = _ref.products;
  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
    sm: "10",
    className: "my-4 products-list",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 7
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 8
    }
  }, products.map(function (product) {
    return product.sizes.map(function (size) {
      return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_1__["Col"], {
        sm: "3",
        __source: {
          fileName: _jsxFileName,
          lineNumber: 11
        }
      }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_Product__WEBPACK_IMPORTED_MODULE_2__["default"], {
        product: product,
        size: size,
        __source: {
          fileName: _jsxFileName,
          lineNumber: 12
        }
      }));
    });
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (ProductsList);

/***/ }),

/***/ "./src/ProductsPage.js":
/*!*****************************!*\
  !*** ./src/ProductsPage.js ***!
  \*****************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ "@babel/runtime/helpers/defineProperty");
/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/objectSpread */ "@babel/runtime/helpers/objectSpread");
/* harmony import */ var _babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ "@babel/runtime/helpers/slicedToArray");
/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! reactstrap */ "reactstrap");
/* harmony import */ var reactstrap__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(reactstrap__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _ProductsFilters__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ProductsFilters */ "./src/ProductsFilters.js");
/* harmony import */ var _ProductsList__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./ProductsList */ "./src/ProductsList.js");
/* harmony import */ var _content_products__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./content/products */ "./src/content/products.js");



var _jsxFileName = "/home/chris/git/moonlight-maples/src/ProductsPage.js";






var ProductsPage = function ProductsPage() {
  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])(_content_products__WEBPACK_IMPORTED_MODULE_7__["default"]),
      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState, 2),
      products = _useState2[0],
      updateProducts = _useState2[1];

  var _useState3 = Object(react__WEBPACK_IMPORTED_MODULE_3__["useState"])({
    minPrice: 0,
    maxPrice: 999,
    types: _content_products__WEBPACK_IMPORTED_MODULE_7__["default"].map(function (product) {
      return product.name;
    })
  }),
      _useState4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_2___default()(_useState3, 2),
      filters = _useState4[0],
      updateFilters = _useState4[1]; //useEffect(() => 
  //api call here to s3 here to get products information
  //)


  var refineProducts = function refineProducts(filters) {//price filter
    //type filter
  };

  var updateField = function updateField(e) {
    updateFilters(_babel_runtime_helpers_objectSpread__WEBPACK_IMPORTED_MODULE_1___default()({}, filters, _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()({}, e.target.name, e.target.value)));
    refineProducts(filters);
    console.log(filters);
  };

  return react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement("div", {
    className: "container-1600",
    __source: {
      fileName: _jsxFileName,
      lineNumber: 34
    }
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(reactstrap__WEBPACK_IMPORTED_MODULE_4__["Row"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 35
    }
  }, react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ProductsFilters__WEBPACK_IMPORTED_MODULE_5__["default"], {
    products: products,
    filters: filters,
    updateField: updateField,
    updateProducts: updateProducts,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 36
    }
  }), react__WEBPACK_IMPORTED_MODULE_3___default.a.createElement(_ProductsList__WEBPACK_IMPORTED_MODULE_6__["default"], {
    products: products,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 37
    }
  })));
};

/* harmony default export */ __webpack_exports__["default"] = (ProductsPage);

/***/ }),

/***/ "./src/content/aboutPageRows.js":
/*!**************************************!*\
  !*** ./src/content/aboutPageRows.js ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _images_image1_jpg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../images/image1.jpg */ "./src/images/image1.jpg");
/* harmony import */ var _images_image1_jpg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_images_image1_jpg__WEBPACK_IMPORTED_MODULE_0__);

var aboutPageRows = [{
  imageSrc: _images_image1_jpg__WEBPACK_IMPORTED_MODULE_0___default.a,
  imageAlt: "Placeholder image 1",
  contentTitle: "This is a title!",
  contentText: "This is some text that is in context with the title and the image!"
}, {
  imageSrc: _images_image1_jpg__WEBPACK_IMPORTED_MODULE_0___default.a,
  imageAlt: "Placeholder image 1",
  contentTitle: "This is a title!",
  contentText: "This is some text that is in context with the title and the image!"
}, {
  imageSrc: _images_image1_jpg__WEBPACK_IMPORTED_MODULE_0___default.a,
  imageAlt: "Placeholder image 1",
  contentTitle: "This is a title!",
  contentText: "This is some text that is in context with the title and the image!"
}];
/* harmony default export */ __webpack_exports__["default"] = (aboutPageRows);

/***/ }),

/***/ "./src/content/linksLists.js":
/*!***********************************!*\
  !*** ./src/content/linksLists.js ***!
  \***********************************/
/*! exports provided: sitemapLinks, contactLinks */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sitemapLinks", function() { return sitemapLinks; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "contactLinks", function() { return contactLinks; });
var sitemapLinks = [{
  label: 'Home'
}, {
  label: 'Products'
}, {
  label: 'About'
}, {
  label: 'Moonlight Apiaries'
}];
var contactLinks = [{
  label: 'moonlightmaples@yahoo.com',
  iconClasses: 'far fa-envelope px-2'
}, {
  label: '(802) 598-2317',
  iconClasses: 'fas fa-phone px-2'
}, {
  label: 'facebook.com/moonlightmaples',
  iconClasses: 'fab fa-facebook px-2'
}];

/***/ }),

/***/ "./src/content/products.js":
/*!*********************************!*\
  !*** ./src/content/products.js ***!
  \*********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _images_maple_leaf_jpg__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../images/maple-leaf.jpg */ "./src/images/maple-leaf.jpg");
/* harmony import */ var _images_maple_leaf_jpg__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_images_maple_leaf_jpg__WEBPACK_IMPORTED_MODULE_0__);

var products = [{
  name: 'Maple Syrup',
  mainImage: _images_maple_leaf_jpg__WEBPACK_IMPORTED_MODULE_0___default.a,
  description: 'This is some maple syrup',
  sizes: [{
    quantity: 'Gallon',
    price: 42,
    image: '',
    featured: true
  }, {
    quantity: '1/2 Gallon',
    price: 23,
    image: ''
  }, {
    quantity: 'Quart',
    price: 14,
    image: ''
  }, {
    quantity: 'Pint',
    price: 8,
    image: ''
  }, {
    quantity: '1/2 Pint',
    price: 5,
    image: ''
  }, {
    quantity: '3.4 Oz',
    price: 3.50,
    image: ''
  }]
}, {
  name: 'Maple Cream',
  mainImage: _images_maple_leaf_jpg__WEBPACK_IMPORTED_MODULE_0___default.a,
  description: 'This is some maple cream',
  sizes: [{
    quantity: 'Pound',
    price: 12,
    image: ''
  }, {
    quantity: '1/2 Pound',
    price: 7,
    image: '',
    featured: true
  }]
}, {
  name: 'Maple Sugar',
  mainImage: _images_maple_leaf_jpg__WEBPACK_IMPORTED_MODULE_0___default.a,
  description: 'This is some maple sugar',
  sizes: [{
    quantity: 'Pound',
    price: 12,
    image: ''
  }, {
    quantity: '1/2 Pound',
    price: 8,
    image: '',
    featured: true
  }]
}, {
  name: 'Maple Honey',
  mainImage: _images_maple_leaf_jpg__WEBPACK_IMPORTED_MODULE_0___default.a,
  description: 'This is some honey',
  sizes: [{
    quantity: '5 lb',
    price: 35,
    image: ''
  }, {
    quantity: '2.5 lb',
    price: 20,
    image: ''
  }, {
    quantity: '2 lb',
    price: 14,
    image: ''
  }, {
    quantity: '16 oz',
    price: 8,
    image: ''
  }, {
    quantity: '8 oz',
    price: 5,
    image: '',
    featured: true
  }]
}];
/* harmony default export */ __webpack_exports__["default"] = (products);

/***/ }),

/***/ "./src/images/image1.jpg":
/*!*******************************!*\
  !*** ./src/images/image1.jpg ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/image1.991d2eed.jpg";

/***/ }),

/***/ "./src/images/info-highlight.jpg":
/*!***************************************!*\
  !*** ./src/images/info-highlight.jpg ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/info-highlight.d6752937.jpg";

/***/ }),

/***/ "./src/images/logo-text.png":
/*!**********************************!*\
  !*** ./src/images/logo-text.png ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ "./src/images/maple-leaf.jpg":
/*!***********************************!*\
  !*** ./src/images/maple-leaf.jpg ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/maple-leaf.d5c9ddd7.jpg";

/***/ }),

/***/ "./src/images/maples-logo.svg":
/*!************************************!*\
  !*** ./src/images/maples-logo.svg ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "static/media/maples-logo.2bea19e5.svg";

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! http */ "http");
/* harmony import */ var http__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(http__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server */ "./src/server.jsx");
/* eslint-disable no-console */


var server = http__WEBPACK_IMPORTED_MODULE_0___default.a.createServer(_server__WEBPACK_IMPORTED_MODULE_1__["default"]);
var currentApp = _server__WEBPACK_IMPORTED_MODULE_1__["default"];
server.listen("3000" || false, function (error) {
  if (error) {
    console.log(error);
  }

  console.log('🚀 started');
});

if (true) {
  console.log('✅  Server-side HMR Enabled!');
  module.hot.accept(/*! ./server */ "./src/server.jsx", function(__WEBPACK_OUTDATED_DEPENDENCIES__) { /* harmony import */ _server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./server */ "./src/server.jsx");
(function () {
    console.log('🔁  HMR Reloading `./server`...');

    try {
      // eslint-disable-next-line global-require
      app = __webpack_require__(/*! ./server */ "./src/server.jsx")["default"];
      server.removeListener('request', currentApp);
      server.on('request', app);
      currentApp = app;
    } catch (error) {
      console.error(error);
    }
  })(__WEBPACK_OUTDATED_DEPENDENCIES__); }.bind(this));
}

/***/ }),

/***/ "./src/indexPage.scss":
/*!****************************!*\
  !*** ./src/indexPage.scss ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ }),

/***/ "./src/server.jsx":
/*!************************!*\
  !*** ./src/server.jsx ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ "react");
/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-router-dom */ "react-router-dom");
/* harmony import */ var react_router_dom__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_router_dom__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! express */ "express");
/* harmony import */ var express__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(express__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react-dom/server */ "react-dom/server");
/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./App */ "./src/App.jsx");
var _jsxFileName = "/home/chris/git/moonlight-maples/src/server.jsx";






var assets = __webpack_require__(/*! ./build/assets.json */ "./build/assets.json");

var server = express__WEBPACK_IMPORTED_MODULE_2___default()();
server.disable('x-powered-by').use(express__WEBPACK_IMPORTED_MODULE_2___default.a["static"]("/home/chris/git/moonlight-maples/public")).get('/*', function (req, res) {
  var context = {};
  var markup = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_3__["renderToString"])(react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react_router_dom__WEBPACK_IMPORTED_MODULE_1__["StaticRouter"], {
    context: context,
    location: req.url,
    __source: {
      fileName: _jsxFileName,
      lineNumber: 16
    }
  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_App__WEBPACK_IMPORTED_MODULE_4__["default"], {
    __source: {
      fileName: _jsxFileName,
      lineNumber: 17
    }
  })));

  if (context.url) {
    res.redirect(context.url);
  } else {
    res.status(200).send("<!doctype html>\n    <html lang=\"\">\n    <head>\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\" />\n        <meta charset=\"utf-8\" />\n        <title>Moonlight Maples</title>\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1\">\n        ".concat(assets.client.css ? "<link rel=\"stylesheet\" href=\"".concat(assets.client.css, "\">") : '', "\n        ").concat( false ? undefined : "<script src=\"".concat(assets.client.js, "\" defer crossorigin></script>"), "\n    </head>\n    <body>\n        <div id=\"root\">").concat(markup, "</div>\n    </body>\n</html>"));
  }
});
/* harmony default export */ __webpack_exports__["default"] = (server);

/***/ }),

/***/ 0:
/*!**************************************************************************!*\
  !*** multi razzle-dev-utils/prettyNodeErrors webpack/hot/poll?300 ./src ***!
  \**************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(/*! razzle-dev-utils/prettyNodeErrors */"razzle-dev-utils/prettyNodeErrors");
__webpack_require__(/*! webpack/hot/poll?300 */"./node_modules/webpack/hot/poll.js?300");
module.exports = __webpack_require__(/*! /home/chris/git/moonlight-maples/src */"./src/index.js");


/***/ }),

/***/ "@babel/runtime/helpers/assertThisInitialized":
/*!***************************************************************!*\
  !*** external "@babel/runtime/helpers/assertThisInitialized" ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/assertThisInitialized");

/***/ }),

/***/ "@babel/runtime/helpers/classCallCheck":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/classCallCheck" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/classCallCheck");

/***/ }),

/***/ "@babel/runtime/helpers/createClass":
/*!*****************************************************!*\
  !*** external "@babel/runtime/helpers/createClass" ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/createClass");

/***/ }),

/***/ "@babel/runtime/helpers/defineProperty":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/defineProperty" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/defineProperty");

/***/ }),

/***/ "@babel/runtime/helpers/getPrototypeOf":
/*!********************************************************!*\
  !*** external "@babel/runtime/helpers/getPrototypeOf" ***!
  \********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/getPrototypeOf");

/***/ }),

/***/ "@babel/runtime/helpers/inherits":
/*!**************************************************!*\
  !*** external "@babel/runtime/helpers/inherits" ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/inherits");

/***/ }),

/***/ "@babel/runtime/helpers/objectSpread":
/*!******************************************************!*\
  !*** external "@babel/runtime/helpers/objectSpread" ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/objectSpread");

/***/ }),

/***/ "@babel/runtime/helpers/possibleConstructorReturn":
/*!*******************************************************************!*\
  !*** external "@babel/runtime/helpers/possibleConstructorReturn" ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/possibleConstructorReturn");

/***/ }),

/***/ "@babel/runtime/helpers/slicedToArray":
/*!*******************************************************!*\
  !*** external "@babel/runtime/helpers/slicedToArray" ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@babel/runtime/helpers/slicedToArray");

/***/ }),

/***/ "@fortawesome/fontawesome-svg-core":
/*!****************************************************!*\
  !*** external "@fortawesome/fontawesome-svg-core" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/fontawesome-svg-core");

/***/ }),

/***/ "@fortawesome/free-solid-svg-icons":
/*!****************************************************!*\
  !*** external "@fortawesome/free-solid-svg-icons" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/free-solid-svg-icons");

/***/ }),

/***/ "@fortawesome/react-fontawesome":
/*!*************************************************!*\
  !*** external "@fortawesome/react-fontawesome" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@fortawesome/react-fontawesome");

/***/ }),

/***/ "@material-ui/core/Button":
/*!*******************************************!*\
  !*** external "@material-ui/core/Button" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Button");

/***/ }),

/***/ "@material-ui/core/Card":
/*!*****************************************!*\
  !*** external "@material-ui/core/Card" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Card");

/***/ }),

/***/ "@material-ui/core/CardContent":
/*!************************************************!*\
  !*** external "@material-ui/core/CardContent" ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/CardContent");

/***/ }),

/***/ "@material-ui/core/Hidden":
/*!*******************************************!*\
  !*** external "@material-ui/core/Hidden" ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Hidden");

/***/ }),

/***/ "@material-ui/core/Typography":
/*!***********************************************!*\
  !*** external "@material-ui/core/Typography" ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("@material-ui/core/Typography");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("express");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("http");

/***/ }),

/***/ "razzle-dev-utils/prettyNodeErrors":
/*!****************************************************!*\
  !*** external "razzle-dev-utils/prettyNodeErrors" ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("razzle-dev-utils/prettyNodeErrors");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-dom/server");

/***/ }),

/***/ "react-router-dom":
/*!***********************************!*\
  !*** external "react-router-dom" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-router-dom");

/***/ }),

/***/ "react-transition-group":
/*!*****************************************!*\
  !*** external "react-transition-group" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("react-transition-group");

/***/ }),

/***/ "reactstrap":
/*!*****************************!*\
  !*** external "reactstrap" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("reactstrap");

/***/ })

/******/ });
//# sourceMappingURL=server.js.map