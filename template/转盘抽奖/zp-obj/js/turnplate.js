
var turnplate = {
		restaraunts:[],				//大转盘奖品名称
		colors:[],					//大转盘奖品区块对应背景颜色
		outsideRadius:192,			//大转盘外圆的半径
		textRadius:155,				//大转盘奖品位置距离圆心的距离
		insideRadius:68,			//大转盘内圆的半径
		startAngle:0,				//开始角度
		bRotate:false,				//false:停止;ture:旋转
        init: function(element,options){
        	this.element = $(element);
        	this.options = options;
        	this.getPrizeItem();
        	this.drawWheel();
        	this.initEvent();
        },
        
        /**
         * @description: 1、获取奖品存储到数组中；2、设置转盘填充颜色
         */
        getPrizeItem: function(){
        	for(var i=0,len=this.options.dataArr.length;i<len;i++){
        		this.restaraunts.push(this.options.dataArr[i].prizeName);
        		i%2 === 0 ? this.colors.push("#fff4d6"): this.colors.push("#fff");
        	}
        },

        /**
         * @description: 绘制转盘
         */
        drawWheel: function(){
        	var cvs = document.getElementById("wheelcanvas");
        	if(cvs.getContext){
				var ctx = cvs.getContext("2d");
				// 根据奖品数量获得每个奖品所占有角度（这里要转成弧度）
				var len = this.restaraunts.length;
				var arc = 2*Math.PI / len;
				//在给定矩形内清空一个矩形
			    ctx.clearRect(0,0,422,422);
				// 控制奖品奇偶数情况下从何处绘制转盘
				  var point;
				  if(turnplate.restaraunts.length %2 === 0){
					  point = Math.PI/2; // 从90度处开始会
				  }else{
					  // 奖品奇数时从新处理奖品背景色
					  var colorLen = turnplate.restaraunts.length;
					  if(colorLen === 3){
						 var colorGroupLen = Math.ceil(colorLen / 3);
						  turnplate.colors = [];
						  for(var i=0; i<colorGroupLen; i++){
							turnplate.colors.push("#fff4d6");
							turnplate.colors.push("#fff");	
							turnplate.colors.push("#ffebb2");						
						  }  
					  }
					 
					  point = Math.PI/2 + arc/2; // 从90度+一个转盘一半的度数
				  }
				// 开始画圆
				for(var i = 0; i< len; i++){
					var angle = this.startAngle + i*arc + point;
					ctx.beginPath();
					ctx.fillStyle = this.colors[i];
					/** 1、扇形的2中方法*/
					// 1、先移动点到圆心==》画圆弧==》 填充闭合
					/*ctx.moveTo(211,211);
					ctx.arc(211,211,turnplate.outsideRadius,angle,angle + arc);
					ctx.fill();*/

					// 2、外圆和内圆组合，先顺时针画外圆==》逆时针画内圆==》填充
					ctx.arc(211,211,this.outsideRadius,angle,angle + arc);
					ctx.arc(211,211,this.insideRadius,angle+arc,angle,true);
					ctx.fill();

					// 保存画布状态
					ctx.save();

					/** 2、绘制奖品 */
					ctx.fillStyle = "#E5302F";
					var prizeName = turnplate.restaraunts[i],
						lineHeight = 17;
					//translate方法重新映射画布上的 (0,0) 位置：把画布缩小一圈，让文字与转盘顶部产生间距
					ctx.translate(211 + Math.cos(angle + arc / 2) * this.textRadius, 211 + Math.sin(angle + arc / 2) * this.textRadius);
					//rotate方法旋转当前的绘图: 使文字与所在扇形垂直（先把奖品旋转到扇形正中间，在旋转90度与扇形垂直放置）
					ctx.rotate(angle + arc / 2 + Math.PI / 2);

					// 处理流量信息
					if(prizeName.indexOf("M") !== -1){
						// 处理流量数字，流量和数量描述2行显示
						var txts = prizeName.split("M");       // 按照M把数字和描述拆分出来
		                for(var j= 0,len1=txts.length; j<len1; j++){
			                ctx.font = j == 0 ? "bold 20px Microsoft YaHei" : "16px Microsoft YaHei";
			                if(j === 0){
				                // 数字
				                ctx.fillText(txts[j]+"M",-ctx.measureText(txts[j]+"M").width / 2,j*lineHeight);
			                }else{
				                // 文字描述
				                ctx.fillText(txts[j],-ctx.measureText(txts[j]).width / 2,j * lineHeight);
			                }
		                }
					}else if(prizeName.indexOf("M") == -1 && prizeName.length >= 6){
						// 处理其他奖品信息，且长度超过一定范围:  将奖品截断成2部分在不同行显示
						var text = prizeName.slice(0,6) + "||" + prizeName.slice(6);
						var texts = text.split("||");
						for(var n= 0,l =texts.length; n < l; n++){
							ctx.fillText(texts[n], -ctx.measureText(texts[n]).width / 2, n * line_height);
						}
					}else{
						// 处理其他奖品信息,文字在6个以内
						ctx.font = "16px Microsoft YaHei";
						ctx.fillText(prizeName,-ctx.measureText(prizeName).width / 2, 0)
					}

					/** 3、添加对应图标 */
					if(prizeName.indexOf("闪币")>0){
						var img= document.getElementById("shan-img");
						ctx.drawImage(img,-15,10);
					}else if(prizeName.indexOf("谢谢参与")>=0){
						var img= document.getElementById("sorry-img");
						ctx.drawImage(img,-15,10);
					}
				   // 恢复画布状态
		           ctx.restore();
		        }

		    }  
        },
        
        /**
         * @description: 获得抽奖结果
         */
        getPrize: function(min,max){
		   return Math.floor(Math.random()*(max - min + 1)+ min);
	    },
        
        /** 
         * @description: 根据奖品名称获取奖品对应的下标
         * @params: {string} prizeName  奖品名称
         * @returns {number} prizeIndex 奖品下标 
         */
        getIndexByPName: function(prizeName){
        	var data = this.options.dataArr;
        	for(var i=0,len=data.length; i<len;i++){
        		if(data[i].prizeName === prizeName){
        			return i+1;    // 注意次数第一个奖品为1
        		}
        	}
        },

	    /**
		 * @description: 旋转转盘
		 * @params {string} prizeName  奖品名称
		*/
		rotateWheel: function(prizeName){
			var self = this;
			// 未中奖
			if(prizeName === -1){
				if(this.restaraunts.length %2 !== 0){
					// 奖品配置奇数个
					var angle = 90;
				}else{
					//var angles = 360 / (this.restaraunts.length)+ 360 / (this.restaraunts.length*2);
					var angle = 360 / (this.restaraunts.length);
				}
				
				prizeName = "未中奖";
				console.log("未中奖");
			}else{
				var prizeIndex = this.getIndexByPName(prizeName);
				// 每个奖品占有角度
				var perAngle = 360 / this.restaraunts.length;
				// 根据奖品计算奖品所在角度(注意rotate插件参数是角度),这里角度是正中间位置，
				var angle = prizeIndex*perAngle - perAngle/2;
				if(this.restaraunts.length %2 !== 0){
					// 绘制转盘是少绘制了转盘一半的度数，所以需要加上一半圆弧度数
					angle += (360 / (this.restaraunts.length*2));
				}
				// 这里需要区分 奖品在是否在1点钟和2点钟方向(右上角位置)
				// 因为转盘需要在270正中间停止(指针指向上方位置停止)
				// 270-angle,不是右上角，转盘选择1800度后(5圈)回到原点，在旋转270-angle度即可到指针正上方停止
				// 360-angle+270,一点钟或2点钟方向，由于canvas三点中方向是0度，所以需要先转到到0度处(360-angle)
				// 再转270度即可到达指针正上方
				angle = angle < 270 ? (270-angle) : (360-angle+270);
			}
            
			$("#wheelcanvas").stopRotate();
			$("#wheelcanvas").rotate({
				angle: angle,                  // 旋转起始角度
				animateTo: angle + 1800-90,   // 旋转结束角度,减90修正转盘从90度位置开始绘制
				duration: 8000,            // 持续时间 
				callback: function(){      // 旋转结束后回调函数
					// 将转盘标记为停止状态
					self.bRotate = !self.bRotate;
					self.options.stop.call(self, prizeName);
				}
			});
		},

        initEvent: function(){
        	var self = this;
        	// 单击旋转转盘
			$(".pointer").click(function(){
			    // 防止用户连续单击
			    if(self.bRotate){
					return false;
				}
				self.bRotate = !self.bRotate;
				self.options.onLottery.call(self);
			    // 随机获取中奖产品索引
			    //var prizeIndex = self.getPrize(1,turnplate.restaraunts.length);
				// 获取奖品名称
				//var prizeName = self.restaraunts[prizeIndex - 1];
				// 选转转盘
				//self.rotateWheel(prizeIndex,prizeName)
			});
        }
	};

	
	
	
	
	
	
	
	
	
	
