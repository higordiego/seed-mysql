module.exports = ({
    returnCreateSuccess: (object, res) => res.status(201).json(object),
    returnSuccess: (object, res) => res.status(201).json(object),
    returnError: (err, res) => {
        console.log(err)
        res.status(400).json(err)
    },
    returnUpdate: (object, res) =>
        (object[0])
            ? res.status(200).json([{title: 'Alterado com sucesso!', message: 'Conseguimos alterar o seu registro com sucesso!'}])
            : res.status(400).json([{title: 'Error em alterar!', message: 'Não foi possivel efetuar atualização, tente novamente!'}]),

    returnUpdateActive: (object, res) =>
        (object[0])
            ? res.status(200).json([{title: 'Reenvio de Código ', message: 'Código de ativação enviado com Sucesso!'}])
            : res.status(400).json([{title: 'Error em Reenvio de Código!', message: 'Não foi possivel reenviar o código, tente novamente!'}]),

    returnDelete: (object, res) =>
        (object)
            ? res.status(200).json([{title: 'Deletado', message: 'Deletado com Sucesso!'}])
            : res.status(400).json([{title: 'Error', message: 'Não contém o registro!'}]),

    returnListSuccess: (object, res) => res.status(200).json(object)
})
