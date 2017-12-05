# getVideoLink
前段时间在群里有人提出是否可以抓取爱奇艺等视频网站地址,出于好奇心有点重的我自己去尝试了下 还是有迹可循的 就当作学习和大家交流下

主要是抓取爱奇艺的网站视频链接，可将任意爱奇艺播放链接作为参数跟在后面 可自行获取真实的播放地址

##演示地址:
http://localhost:3000/?url=(爱奇艺链接)

##http://localhost:3000/?url=http://m.iqiyi.com/v_19rrek8nm0.html

返回格式为json 播放地址在 "m3u" 字段 格式为:
    "http://222.134.2.36/videos/v0/20171130/f9/c4/c4895afc94052cc969984c59e99a46e6.mp4?key=01ab16edc6ca5b49f8fffe4f1355cc1ce&dis_k=2c6a21f05ec8d50cac27849092e272f7d&dis_t=1512462540&dis_dz=CNC-BeiJing&dis_st=44&src=iqiyi.com&uuid=a0a830f-5a2658cc-d&m=v&qd_ip=8bc60389&qd_p=8bc60389&qd_k=e7c35b2eada5370e1e6e2122b9f66729&qd_src=02020031010000000000&ssl=&ip=139.198.3.137&qd_vip=0&dis_src=vrs&qd_uid=0&qdv=1&qd_tm=1512462540033"

不过想要获取会员专区里面的 那还需要你自己去买一个会员然后把登陆的token写入到代码中 如下开启注释即可

//获取普通视频可不用会员账号登陆  如会员专区的可使用会员登陆后设置cookie 可直接抓取
```cookie.setCookie(request.cookie('P00001=41c7Mfc2TCeC3y5jWLQGcTm3Dm2wQw1qOdGhduJzTbvQe21TJ5j9tBExRXN7ltry17HOp8b'), _urlAttestation);
