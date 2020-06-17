case 11:
    jo.put("status", 11);
    jo.put("message", "审核中!");
    break; //可选
case 33:
    jo.put("status", 33);
    jo.put("message", "您的资料正在完善中，请等待!"); //秘书公司审核通过
    break; //可选
case 44:
    jo.put("status", 44);
    jo.put("message", "您的资料正在完善中，请等待!"); //秘书公司审核通过
    break; //可选
case 55:
    jo.put("status", 55);
    jo.put("message", "您的资料正在完善中，请等待!"); //秘书公司审核通过
    break; //可选
case 66:
    jo.put("status", 66);
    jo.put("message", "您的资料正在完善中，请等待!"); //秘书公司审核通过
    break; //可选
case 8:
    if (user.getIshavesfxy() == 0) { //弹出3方协议
        sessionProvider.setAttribute(request, response, Constants.ADMIN_SESSION, user);
        jo.put("userid", user.getId());
        jo.put("status", 175);
        jo.put("message", "对不起，您还没有签订四方协议!");
    } else {

        jo.put("status", 8);
        jo.put("message", "登陆成功!");
        user.setIslogin(1);
        userService.updateByPrimaryKey(user);
        sessionProvider.setAttribute(request, response, Constants.ADMIN_SESSION, user);
    }
    break; //可选
case 4:
    jo.put("status", 4);
    jo.put("message", "跳转到确认界面!");
    user.setIslogin(1);
    userService.updateByPrimaryKey(user);
    sessionProvider.setAttribute(request, response, Constants.ADMIN_SESSION, user);
    break; //可选






    // /2. 自行注册  start


    switch (user.getStatus()) {
        case 0:

            jo.put("status", 0);
            jo.put("message", "登陆成功!");
            user.setIslogin(1);
            userService.updateByPrimaryKey(user);
            sessionProvider.setAttribute(request, response, Constants.ADMIN_SESSION, user);
            break; //可选
        case 11: //服务费用退回

            jo.put("status", 11);
            jo.put("message", "跳转到确认界面!");
            user.setIslogin(1);
            userService.updateByPrimaryKey(user);
            sessionProvider.setAttribute(request, response, Constants.ADMIN_SESSION, user);
            break; //可选
        case 55: ////有单位  业者 ，单位退回个人信息

            jo.put("status", 55);
            jo.put("message", "跳转到确认界面!");
            user.setIslogin(1);
            userService.updateByPrimaryKey(user);
            sessionProvider.setAttribute(request, response, Constants.ADMIN_SESSION, user);
            break; //可选
        case 22: //没有单位  业者 ，业务员退回个人信息

            jo.put("status", 22);
            jo.put("message", "跳转到确认界面!");
            user.setIslogin(1);
            userService.updateByPrimaryKey(user);
            sessionProvider.setAttribute(request, response, Constants.ADMIN_SESSION, user);
            break; //可选
        case 3: //单位或公司退回，修改页面
            jo.put("status", 3);
            jo.put("message", "您的商户信息完善中，请等待!"); //秘书公司审核通过
            break; //可选

        case 1: //等待业务员审核服务费用
            jo.put("status", 1);
            jo.put("message", "您的服务费用标准审核中，请等待!"); //秘书公司审核通过
            break; //可选
        case 5:
            jo.put("status", 5);
            jo.put("message", "单位审核中，请等待!"); //秘书公司审核通过
            break; //可选
        case 2: //等待业务员审核个人信息
            jo.put("status", 2);
            jo.put("message", "您的个人信息正在审核中，请等待!"); //秘书公司审核通过
            break; //可选

        case 8:
            if (user.getIshavesfxy() == 0) { //弹出3方协议
                sessionProvider.setAttribute(request, response, Constants.ADMIN_SESSION, user);
                jo.put("userid", user.getId());
                jo.put("status", 175);
                jo.put("message", "对不起，您还没有签订四方协议!");
            } else {

                jo.put("status", 8);
                jo.put("message", "登陆成功!");
                user.setIslogin(1);
                userService.updateByPrimaryKey(user);
                sessionProvider.setAttribute(request, response, Constants.ADMIN_SESSION, user);
            }
            break; //可选
        case 4:

            jo.put("status", 4);
            jo.put("message", "跳转到确认界面!");
            user.setIslogin(1);
            userService.updateByPrimaryKey(user);
            sessionProvider.setAttribute(request, response, Constants.ADMIN_SESSION, user);
            break; //可选
        case 44:
            jo.put("status", 44);
            jo.put("message", "您的资料正在完善中，请等待!"); //秘书公司审核通过
            break; //可选
    }


    // jo.put("dlregid", user.getIslr());          0.为自行注册。 大于0为，代理注册
    jo.put("status", 100);
    jo.put("message", "密码有误,请重新输入");

    jo.put("status", -1);
    jo.put("message", "账号不存在");




    // ------------------------------------------------
    JSONObject jo = new JSONObject();
    jo.put("tel", tel);
    jo.put("realname", user.getRealname()); //姓名
    jo.put("email", info.getEmail()); //
    jo.put("cardcode", info.getCardcode()); //身份证号
    jo.put("UpCardId", info.getUpcardid()); //身份证下面
    jo.put("DownCardId", info.getDowncardid()); //身份证背面
    jo.put("name", sr.getName()); //开户行
    jo.put("khname", sr.getKhname()); //开户名
    jo.put("code", sr.getCode()); //账号

    if (StringUtils.isNotBlank(info.getReasons())) {
        jo.put("reason", info.getReasons()); //
    } else {
        jo.put("reason", ""); //账号
    }
    // ---------------------------------------------------------
    Companyinfo companyinfo = cominfoService.selectByPrimaryKey(user.getCompanyid());
    if (companyinfo != null) {
        jo.put("xycode", companyinfo.getXycode()); //统一信用代码
        jo.put("jyname", companyinfo.getJyname()); //经营者姓名
        jo.put("comname", companyinfo.getName()); //商户名称
        jo.put("addtime", companyinfo.getAddtime()); //注册时间
        jo.put("businessRange", companyinfo.getBusinessrange()); //经营范围

        jo.put("registerCompany", companyinfo.getRegistercompany()); //登记机关
        if (StringUtils.isNotBlank(companyinfo.getAddress())) {
            jo.put("address", companyinfo.getAddress()); //地址
        } else {
            jo.put("address", ""); //地址
        }
        jo.put("getCardTime", companyinfo.getGetcarttime()); //发证日期
        jo.put("CertificUpUrl", companyinfo.getCertificupurl()); //营业执照正面
        jo.put("dg_name", dg.getName()); // 对公  开户行
        jo.put("dg_khname", dg.getKhname()); // 对公  开户名
        jo.put("dg_code", dg.getCode()); // 对公  账号
    }


    if (info.getHycode() == 1) jo.put("hyname", "工业、交通运输业、商业"); //行业名称
    if (info.getHycode() == 2) jo.put("hyname", "建筑业"); //行业名称
    if (info.getHycode() == 3) jo.put("hyname", "房地产开发业"); //行业名称
    if (info.getHycode() == 4) jo.put("hyname", "饮食服务业"); //行业名称
    if (info.getHycode() == 5) jo.put("hyname", "娱乐业"); //行业名称
    if (info.getHycode() == 6) jo.put("hyname", "其它行业"); //行业名称



    jo.put("zzshdde", info.getZzshdde()); //增值税定额
    jo.put("gshdde", info.getGshdde()); //个税核定定额

    // -----------------------------------------------------------------
    if (xieyi.getCategory() == 2) { //图片形式
        JSONArray newjr = new JSONArray();

        String[] imgs = xieyi.getUrls().split(",");
        for (int i = 0; i < imgs.length; i++) {
            JSONObject yyy = new JSONObject();
            yyy.put("url", imgs[i]);
            newjr.add(yyy);
        }
        jo.put("imgs", newjr); //图片

    } else {
        jo.put("xytext", xieyi.getDescripts()); //和单位协议内容
    }
    jo.put("xytype", xieyi.getCategory()); //1.文本 2.图片
    jo.put("dwname", xieyi.getSfname()); //单位名称
    jo.put("xyid", xieyi.getId()); //协议ID
    jo.put("ishave_dw", 0); //是否有单位 0无单位 1有单位
    jo.put("xy_mstext", xieyi.getDescripts()); //和公司协议内容
    jo.put("fpbili", xieyi.getFpbili()); //分配比例