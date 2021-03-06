'use strict';

var _tfjs = require('@tensorflow/tfjs');

var tf = _interopRequireWildcard(_tfjs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

// //定义线性回归模型
// const model = tf.sequential();
// model.add(tf.layers.dense({units: 1, inputShape: [1]}));

// // 定义损失函数和优化方法
// model.compile({
//     loss: 'meanSquaredError', 
//     optimizer: 'sgd'
// });

// // 添加训练数据
// const xs = tf.tensor([1, 2, 3, 4], [4, 1]);
// const ys = tf.tensor([2, 4, 6, 8], [4, 1]);

// // 训练并预测
// model.fit(xs, ys).then(() => {
//     model.predict(tf.tensor([5], [1, 1])).print();
// });

//add,sub,mul只能在同规模的张量之间和标量进行
//matMul 矩阵乘法
// const b = tf.tensor([[1,2,3],[4,5,6]]);
// b.print();
// const a= tf.zeros([3,3]);
// a.print();
// const c = tf.ones([2,3]);
// c.print();
// let v = tf.variable(a);
// v.print();
// v = c;
// v.print();
// const d = b.square().print();
// const e = tf.mul(b,c);
// e.print();
// const f = tf.scalar(3);
// tf.sub(b,f).print();
// tf.matMul(b,a).print();
// b.transpose().print();
// //const g = tf.oneHot(tf.tensor1d([0.0,1.0,2.0]),3).print(); 
// b.min(0).print();
// b.mean(0).print();
// b.sum(0).print();
// b.dispose();
// tf.tidy(()=>{
//     return neededData;
// });

//实现线性回归模型 y = w * x + b
// const tx = [1,2,3,4,5];
// const ty = [2,4,6,8,10];
// const w = tf.variable(tf.scalar(Math.random()));
// const b = tf.variable(tf.scalar(Math.random()));
// const train_x = tf.tensor1d(tx);
// const train_y = tf.tensor1d(ty);

// //定义学习率和迭代次数
// const iterations = 200; 
// const learningRate = 0.5;

// const f = x => w.mul(x).add(b);

// //选择优化器sgd,momentum,adam等
// const optimizer = tf.train.adam(learningRate);

// //定义均方差损失函数
// const loss = (pred,label) => pred.sub(label).square().mean();

// //开始训练
// for(let iter = 0;iter < iterations;iter++){
//     optimizer.minimize(()=>{
//         const loss_var = loss(f(train_x),train_y);
//         console.log('loss: ');
//         loss_var.print();
//         console.log('w: ');
//         w.print();
//         b.print();
//         return loss_var;
//     })
// }

//实现logistic回归
// function logistic_regression(train_data,train_label){
//     const iterations = 200;
//     const learningRate = 0.1;
//     const optimizer = tf.train.adam(learningRate);

//     //计算类别数量
//     const num_labels = Array.from(new Set(train_label)).length;
//     const num_data = train_label.length;

//     const w = tf.variable(tf.zeros([2,num_labels]));
//     const b = tf.variable(tf.zeros([num_labels]));

//     const train_x = tf.tensor2d(train_data);
//     const train_y = tf.tensor1d(train_label,'int32');

//     function predict(x){
//         return tf.softmax(tf.add(tf.matMul(x,w),b));
//     }
//     //定义交叉熵损失函数
//     function loss(predictions,labels){
//         const y = tf.oneHot(labels,num_labels);
//         const entropy = tf.mean(tf.sub(tf.scalar(1),tf.sum(tf.mul(y,tf.log(predictions)),1)));
//         return entropy;
//     }
//     //开始训练
//     for(let iter=0;iter<iterations;iter++){
//         optimizer.minimize(()=>{
//             const loss_var = loss(predict(train_x),train_y);
//             loss_var.print();
//             return loss_var;
//         });
//     }
//     console.log('训练完毕...\n test:');

//     console.log('[7,7]: ',predict(tf.tensor2d([[7,7]])).print());
// }

var train_data = [[1, 2], [1, 3], [2, 3], [2, 4], [3, 5], [3, 6], [5, 5], [6, 7], [7, 6]];
var train_label = [1, 1, 2, 2, 3, 3, 5, 6, 7];
// logistic_regression(train_data,train_label);

//实现knn L1距离度量
function knn(train_data, train_label) {
    var train_x = tf.tensor2d(train_data);
    var train_y = tf.tensor1d(train_label, 'int32');

    return function (x) {
        var res = [];
        x.map(function (point) {
            var input_tensor = tf.tensor1d(point);
            var distance = tf.sum(tf.abs(tf.sub(input_tensor, train_x)), 1);
            var index = tf.argMin(distance, 0);
            res.push(train_label[index.dataSync()[0]]);
        });
        return res;
    };
}
var pred = knn(train_data, train_label)([[2, 2]]);
console.log(pred);
