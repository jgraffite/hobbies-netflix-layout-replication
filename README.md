# Netflix - Replicação HTML de Layout / Layout Replication in HTML

### Sobre o projeto / About the project

Esse projeto é uma replicação pura de HTML/Javascript/CSS do layout da página inicial do [Netflix](http://www.netflix.com "Netflix") contendo todas os seus efeitos e funcionalidades visuais, reprodução rápida de vídeos com trailers das séries listadas neste replicação.

Observação: A função deste projeto é de somente replicar os elementos visuais e funcionaliddes visuais básicas da página inicial, não estendendo à funcionalidades de busca por séries, categorização, reprodução de episódios e outras funcionalidades exclusivas do site/aplicativo da Netflix.

------------

*This project is a replication with pure HTML/Javascript/CSS of [Netflix](http://www.netflix.com "Netflix") Homepage Layout containing all its effects and visual functionalities, short videos reproduction with trailers of listed tv shows.*

*Note: The goal of this project is just and only replic visual elements and basic visual funcionalities of Netflix homepage, not extending to funcionalities of tv shows search, caegorization, episodes reproduction or other exclusive functionalities of Netflix application/website;*

### Características / Features

- Fidelidade ao visual do site da Netflix;
- As imagens (miniatura das séries) foram retiradas do site da Netflix e capas de sites de promoção da série;
- Os ícones exibidos são da biblioteca [FontAwesome](http://fontawesome.com "FontAwesome") na sua versão gratuita. Por isso alguns ícones terão visuais ligeiramente diferentes dos exibidos no site da Netflix;
- Fontes utilizadas foram as universais e gratuitas através do Google Fonts. Por isso será possível ver algumas ligeiras diferenças visuais.

------------

- *Netflix website visual fidelity;*
- *The images (tv shows thumbs) was get from the Netflix website and covers from some promotion websites;*
- *The icons displayed are from the library [FontAwesome](http://fontawesome.com "FontAwesome") in its free version. This is why some icons are displayed a bit different from those displayed in the Netflix website;*
- *The used fonts was the universals and free by Google Fonts. This is why will be possible see some visual differences.*

###Rodando a aplicação / Running the project

Para levantar a aplicação, basta copiar e colar o comando abaixo no seu terminal:

------------

*To run this application just copy and paste in your terminal the following command:*

`npm run serve`


### Tecnologias para os vídeos / Technologies for vídeos

A [Youtube Player API](https://developers.google.com/youtube/iframe_api_reference?hl=pt-br "Youtube Player API") foi usada para a reprodução dos trailers das séries. O motivo da escolha desta api o invés da tHTML tag `<video>` is the great do HTML é a maior oferta de vídeos gratuitos e de fácil incorporação no serviço do Google.

Ainda assim você pode optar por usar a tag `<video>` e o vídeo disponibilizado nesse repositório, bastando somente descomentar as seguintes linhas, comentando a que logo a sucede:

- [/index.html - linha 99](index.html#L99 "/index.html")
- [/index.html - linha 594](index.html#L594 "/index.html")
- [/index.html - linha 829](index.html#L829 "/index.html")

------------

*The [Youtube Player API](https://developers.google.com/youtube/iframe_api_reference?hl=pt-br "Youtube Player API") was used to reproduce the tv shows trailers. The motive behind this chose, instead of the HTML tag `<video>` is the vast offer of free videos and easy incorporation of the service from Google.*

------------


*Even though, you can opt in for use the tag `<video>` and set it to the .mp4 video available in this repository, just uncomment the following lines, commenting the subsequent line:*

- [/index.html - linha 99](index.html#L99 "/index.html")
- [/index.html - linha 594](index.html#L594 "/index.html")
- [/index.html - linha 829](index.html#L829 "/index.html")

### Links

Você pode conferir a demonstração deste repositório online neste link: [Demonstração / Demo](https://jgraffite.github.io/netflix-layout-replication/html/)

------------


*You can see this project running on this link: [Demonstração / Demo](https://jgraffite.github.io/netflix-layout-replication/html/)*