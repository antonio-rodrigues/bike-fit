export default {
  name: "Bike Fit",
  login: "Login",
  register: "Registar",
  logout: "Logout",
  settings: "Definições",
  general_settings: {
    label: "Definições Gerais",
    backup: {
      label: "Cópia segurança",
      save: "Guardar todas as definições",
      restore: "Repôr definições guardadas",
      success: "Operação concluída",
      failure: "Upssss! Algo correu mal... por favor, tenta mais tarde",
      info: {
        row1: "A App pode guardar uma cópia das suas definições na Cloud. Clique em \"Guardar...\" para efectuar a cópia.",
        row2: "Enganou-se? Não se lembra quais as opções que estavam selecionadas antes? Ou simplesmente re-instalou a app... Nesse caso, pode recuperar facilmente as definições guardadas na Cloud. Clique em \"Repôr...\" e já está!"
      }
    }
  },
  language: "Linguagem",
  back: "Voltar",
  news_feed: "Feed Notícias",
  close: "Fechar",
  ok: "OK",
  open_popup: "Abrir janela",
  connection_error: "Erro de comunicações",
  error: {
    title: "Erro",
    general: "Erro genérico",
    connection: "Erro de comunicações",
    database: "Erro de base de dados",
    unknown: "Erro desconhecido"
  },
  email: "Email",
  password: "Password",
  register_new_account: "Registar nova conta!",
  first_name: "Nome",
  last_name: "Sobrenome",
  confirm_password: "Confirmar Password",
  have_an_account: "Já tens conta? Aceder",
  login_success: "Fez Login com sucesso",
  register_success: "Fez Login com sucesso",
  logout_success: "Fez Logout com sucesso",
  left_menu: "Opções",
  popup: "Popup",
  cancel: "Cancelar",
  offline_message: "Está offline",
  online_message: "Está online",
  please_wait: "por favor, aguarde...",
  home: {
    title: 'Home',
    like: "Gosto",
    more: "Detalhe...",
    nextServices: "Próximos serviços"
  },
  profile: {
    title: "Perfil",
    update: "Actualizar"
  },
  services: {
    type: {
      CHAIN_FULL_CLEAN: "Corrente: limpeza total",
      CHAIN_LUBE: "Corrente: lubrificar",
      CHAIN_REPLACE: "Corrente: substituir",
      GARAGE: "Revisão Periódica",
      UIC_RENEWAL: "Pagamento UIC"
    }
  },
  messages: {
    _default: function (e) {
      return "The " + e + " value is not valid."
    }, after: function (e, n) {
      var t = n[0];
      return "The " + e + " must be after " + t + "."
    }, alpha_dash: function (e) {
      return "The " + e + " may contain alpha-numeric characters as well as dashes and underscores."
    }, alpha_num: function (e) {
      return "The " + e + " may only contain alpha-numeric characters."
    }, alpha_spaces: function (e) {
      return "The " + e + " may only contain alphabetic characters as well as spaces."
    }, alpha: function (e) {
      return "The " + e + " may only contain alphabetic characters."
    }, before: function (e, n) {
      var t = n[0];
      return "The " + e + " must be before " + t + "."
    }, between: function (e, n) {
      var t = n[0], a = n[1];
      return "The " + e + " must be between " + t + " and " + a + "."
    }, confirmed: function (e) {
      return "The " + e + " confirmation does not match."
    }, credit_card: function (e) {
      return "The " + e + " is invalid."
    }, date_between: function (e, n) {
      var t = n[0], a = n[1];
      return "The " + e + " must be between " + t + " and " + a + "."
    }, date_format: function (e, n) {
      var t = n[0];
      return "The " + e + " must be in the format " + t + "."
    }, decimal: function (e, n) {
      void 0 === n && (n = ["*"]);
      var t = n[0];
      return "The " + e + " must be numeric and may contain " + ("*" === t ? "" : t) + " decimal points."
    }, digits: function (e, n) {
      var t = n[0];
      return "The " + e + " must be numeric and exactly contain " + t + " digits."
    }, dimensions: function (e, n) {
      var t = n[0], a = n[1];
      return "The " + e + " must be " + t + " pixels by " + a + " pixels."
    }, email: function (e) {
      return "The " + e + " must be a valid email."
    }, ext: function (e) {
      return "The " + e + " must be a valid file."
    }, image: function (e) {
      return "The " + e + " must be an image."
    }, in: function (e) {
      return "The " + e + " must be a valid value."
    }, ip: function (e) {
      return "The " + e + " must be a valid ip address."
    }, max: function (e, n) {
      var t = n[0];
      return "The " + e + " may not be greater than " + t + " characters."
    }, max_value: function (e, n) {
      var t = n[0];
      return "The " + e + " must be " + t + " or less."
    }, mimes: function (e) {
      return "The " + e + " must have a valid file type."
    }, min: function (e, n) {
      var t = n[0];
      return "The " + e + " must be at least " + t + " characters."
    }, min_value: function (e, n) {
      var t = n[0];
      return "The " + e + " must be " + t + " or more."
    }, not_in: function (e) {
      return "The " + e + " must be a valid value."
    }, numeric: function (e) {
      return "The " + e + " may only contain numeric characters."
    }, regex: function (e) {
      return "The " + e + " format is invalid."
    }, required: function (e) {
      return "The " + e + " is required."
    }, size: function (e, n) {
      var t = n[0];
      return "The " + e + " must be less than " + t + " KB."
    }, url: function (e) {
      return "The " + e + " is not a valid URL."
    }
  },

  attributes: {
    username: "Nome Utilizador",
    email: "Email",
    password: "Password",
    repassword: "Confirmar Password",
    first_name: "Nome",
    last_name: "Sobrenome"
  }
}
