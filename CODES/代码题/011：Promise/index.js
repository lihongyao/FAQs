/*
 * @Author: Lee
 * @Date: 2023-07-16 15:17:26
 * @LastEditors: Lee
 * @LastEditTime: 2023-07-16 16:21:06
 * @Description:
 */
/*
 * @Author: Lee
 * @Date: 2023-07-16 15:17:26
 * @LastEditors: Lee
 * @LastEditTime: 2023-07-16 15:25:21
 * @Description:
 */

// 定义三种状态
const PENDING = Symbol('PENDING'); // 进行中
const FULFILLED = Symbol('FULFILLED'); // 已成功
const REJECTED = Symbol('REJECTED'); // 已失败

class Promise {
  /**
   * 构造函数
   * @param {*} exector
   */
  constructor(exector) {
    // 初始化状态
    this.status = PENDING;
    // 将成功、失败结果放在this上，便于then、catch访问
    this.value = undefined;
    this.reason = undefined;
    // 成功态回调函数队列
    this.onFulfilledCallbacks = [];
    // 失败态回调函数队列
    this.onRejectedCallbacks = [];

    const resolve = (value) => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = FULFILLED;
        this.value = value;
        // 成功态函数依次执行
        this.onFulfilledCallbacks.forEach((fn) => fn(this.value));
      }
    };

    const reject = (reason) => {
      // 只有进行中状态才能更改状态
      if (this.status === PENDING) {
        this.status = REJECTED;
        this.reason = reason;
        // 失败态函数依次执行
        this.onRejectedCallbacks.forEach((fn) => fn(this.reason));
      }
    };

    try {
      // 立即执行executor
      // 把内部的resolve和reject传入executor，用户可调用resolve和reject
      exector(resolve, reject);
    } catch (e) {
      // executor执行出错，将错误内容reject抛出去
      reject(e);
    }
  }

  /**
   * 链式语法
   * @param {*} onFulfilled
   * @param {*} onRejected
   */
  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === 'function' ? onFulfilled : (value) => value;
    onRejected =
      typeof onRejected === 'function'
        ? onRejected
        : (reason) => {
            throw new Error(reason instanceof Error ? reason.message : reason);
          };
    // 保存this
    const self = this;
    return new Promise((resolve, reject) => {
      if (self.status === PENDING) {
        self.onFulfilledCallbacks.push(() => {
          // try捕获错误
          try {
            // 模拟微任务
            setTimeout(() => {
              const result = onFulfilled(self.value);
              // 分两种情况：
              // 1. 回调函数返回值是Promise，执行then操作
              // 2. 如果不是Promise，调用新Promise的resolve函数
              result instanceof Promise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
        self.onRejectedCallbacks.push(() => {
          // 以下同理
          try {
            setTimeout(() => {
              const result = onRejected(self.reason);
              // 不同点：此时是reject
              result instanceof Promise
                ? result.then(resolve, reject)
                : resolve(result);
            });
          } catch (e) {
            reject(e);
          }
        });
      } else if (self.status === FULFILLED) {
        try {
          setTimeout(() => {
            const result = onFulfilled(self.value);
            result instanceof Promise
              ? result.then(resolve, reject)
              : resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      } else if (self.status === REJECTED) {
        try {
          setTimeout(() => {
            const result = onRejected(self.reason);
            result instanceof Promise
              ? result.then(resolve, reject)
              : resolve(result);
          });
        } catch (e) {
          reject(e);
        }
      }
    });
  }
  /**
   * 捕获异常
   * @param {*} onRejected
   * @returns
   */
  catch(onRejected) {
    return this.then(null, onRejected);
  }

  /**
   * 静态方法：Promise.resolve()
   * @param {*} value
   * @returns
   */
  static resolve(value) {
    if (value instanceof Promise) {
      // 如果是Promise实例，直接返回
      return value;
    } else {
      // 如果不是Promise实例，返回一个新的Promise对象，状态为FULFILLED
      return new Promise((resolve, reject) => resolve(value));
    }
  }

  /**
   * 静态方法：Promise.reject()
   * @param {*} reason
   * @returns
   */
  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason);
    });
  }

  /**
   * 静态方法：all
   * @param {*} promiseArr
   * @returns
   */
  static all(promiseArr) {
    return new Promise((resolve, reject) => {
      const len = promiseArr.length;
      const values = new Array(len);
      let count = 0; // 记录已经成功执行的promise个数
      for (let i = 0; i < len; i++) {
        // Promise.resolve()处理，确保每一个都是promise实例
        Promise.resolve(promiseArr[i]).then(
          (val) => {
            values[i] = val;
            count++;
            // 如果全部执行完，返回promise的状态就可以改变了
            if (count === len) resolve(values);
          },
          (err) => reject(err)
        );
      }
    });
  }

  /**
   * 静态方法：race
   * @param {*} promiseArr
   * @returns
   */
  static race(promiseArr) {
    return new Promise((resolve, reject) => {
      promiseArr.forEach((p) => {
        Promise.resolve(p).then(
          (val) => resolve(val),
          (err) => reject(err)
        );
      });
    });
  }
}
