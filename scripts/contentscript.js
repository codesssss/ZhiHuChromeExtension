(function () {
    console.info('content');


    $(function () {

        let url_list_for_star = [
            "https://www.zhihu.com/question/19781253/answer/12942611",
            "https://www.zhihu.com/question/19781253/answer/1031114428",
            "https://www.zhihu.com/question/19781253/answer/1029087937",
            "https://www.zhihu.com/question/19781253/answer/993230430",
            "https://www.zhihu.com/question/19781253/answer/992813633",
            "https://www.zhihu.com/question/19781253/answer/991996657",
            "https://www.zhihu.com/question/19781253/answer/993816848",
            "https://www.zhihu.com/question/19781253/answer/993904079",
            "https://www.zhihu.com/question/19781253/answer/998894036",
        ];

        let local_storage_key = "zhihu_url_list";

        /**
         * 获取下一条需要点赞的链接
         *
         */
        function get_next_url() {
            let current_progress = null;
            current_progress = localStorage.getItem(local_storage_key);
            if (current_progress != null) {
                // 已开始点赞
                let list_has_starred = JSON.parse(current_progress);
                let url_stand_by = url_list_for_star.filter(item => !list_has_starred.includes(item));
                if (url_stand_by != null && url_stand_by.length > 0) {
                    // 还有未点赞的连接
                    let next_url = url_stand_by[0];
                    list_has_starred.push(next_url);
                    localStorage.setItem(local_storage_key, JSON.stringify(list_has_starred));
                    return next_url;
                } else {
                    // 已全部点赞完成
                    window.alert("已全部点赞完成");
                    return null;
                }
            } else {
                // 从localStorage中未读到缓存,说明刚刚开始点赞
                let next_url = url_list_for_star[0];
                let list_has_starred = [next_url];
                localStorage.setItem(local_storage_key, JSON.stringify(list_has_starred));
                return next_url;
            }
        }

        function star_this_answer() {
            let star_btn = document.querySelectorAll(`span > button.Button.VoteButton.VoteButton--up`)[0];
            star_btn.style.color = "white";
            star_btn.style.backgroundColor = "red";
            star_btn.style.webkitTransform = "1.1";
            star_btn.style.boxShadow = "red 0 0 12px 0";
            let msg_box = document.createElement("div");
            msg_box.innerText = "2s后将点赞此条答案";
            msg_box.style.backgroundColor = "red";
            msg_box.style.color = "white";
            msg_box.style.width = "600px";
            msg_box.style.height = "30px";
            msg_box.style.left = "50px";
            msg_box.style.position = "absolute";
            document.body.appendChild(msg_box);
            msg_box.style.top = star_btn.offsetTop + "px";
            window.setTimeout(star_handler, 2000);
        }

        function star_handler() {
            let star_btn = document.querySelectorAll(`span > button.Button.VoteButton.VoteButton--up`)[0];
            star_btn.click();
            let next_url = get_next_url();
            if (next_url != null)
                window.location = next_url;
        }


        function starTask() {
            console.info('start')
            window.setTimeout(star_this_answer, 3000);
        }





        // document.querySelector('.cj_setting').click(function () {
        //     console.info('click')
        // })

        function cj_setting() {

            let open = localStorage.getItem('cj_setting');

            if (open == 'open') {
                console.info('插件已关闭')
                $('.cj_setting').text('插件已关闭');
                localStorage.setItem('cj_setting', 'close');
            } else {
                $('.cj_setting').text('插件开启中');
                console.info('插件已开启')
                localStorage.setItem('cj_setting', 'open');
                starTask();
            }

        }


        // 引入页面
        $('<div class="action_block"><ul></ul></div>').appendTo($('body'));
        $('<li class="checkout-header-Help pl20"> <a href="javascript:void 0" class="cj_setting">插件开启中</a></li>').appendTo($('.action_block ul'));


        let open = localStorage.getItem('cj_setting');

        console.log('localStorage', localStorage)

        console.log('open', open)
        if (open == 'open') {
            $('.cj_setting').text('插件开启中');
            starTask();
        } else {
            $('.cj_setting').text('插件已关闭');
        }

        document.querySelector('.cj_setting').addEventListener('click', clickHandler);
        function clickHandler() {
            console.info('click')
            cj_setting();
        }



    })


})();
