exports.tests = (req, res) => {
    // /profiles/3
    // /profiles/?chave1=valor1&chave2=valor2&chave3=valor3
    //
    console.log(req.params);
    console.log(req.query);
    res.send(req.query.facebookprofile);
};