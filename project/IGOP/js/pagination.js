/**
 * @description: 分页
 * @author: 马平 (16/08/15)
 * @update: 16/10/27 
 */


	function Pagination(options){
		this.options = options;
		this.init();
	}
	
	Pagination.prototype.init = function(){
		// 获取容器对象
		this.$dropdownMenu = $(this.options.dropdownMenu);    // 列表项容器
		this.initEvent();
	};
	
	Pagination.prototype.initEvent = function(){
		var self = this;
		/**单击下拉框按钮或者向下箭头 */
		$(".mg-pagination").on("click",".dropdown-toggle,icon-triangle-down",function(e){
			$(this).parents(".page-dropdown").find(".dropdown-menu").toggle();
			e.stopPropagation();
		});
		
		/** 单击下拉项，获取下拉项内容 */
		$(".mg-pagination").on("click",'.dropdown-menu li',function(){
			var menuCount = $(this).text()
			$(this).parents(".page-dropdown").find(".page-per-count").html(menuCount);
			// 回调，开放给用户
			self.options.callback.call(self,menuCount);
		});
		
		/** 单击空白处折叠下拉项 */
		$(document).on("click",function(e){
	        // 判断事件源是否为分页下拉组件: true 是
			var $targe = $(e.target);
			var isPagination  = $targe.is(".dropdown-toggle") || $targe.is(".page-dropdown"), 
				isSpread      = self.$dropdownMenu.is(":visible");                   // 判断下拉项是否展开
			// 单击空白处时且下拉项是展开的，关闭下拉项
			!isPagination && isSpread &&  self.$dropdownMenu.toggle();
		});
		
	};
