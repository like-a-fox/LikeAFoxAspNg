FROM microsoft/dotnet:2.1-aspnetcore-runtime AS base
WORKDIR /app
EXPOSE 53186
EXPOSE 44364

#setup node
ENV NODE_VERSION 8.11.1
ENV NODE_DOWNLOAD_SHA 0e20787e2eda4cc31336d8327556ebc7417e8ee0a6ba0de96a09b0ec2b841f60
RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output nodejs.tar.gz \
    && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
    && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
    && rm nodejs.tar.gz \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs

FROM microsoft/dotnet:2.1-sdk AS build
WORKDIR /src
COPY src/LikeAFoxAspNg.Web/LikeAFoxAspNg.Web.csproj src/LikeAFoxAspNg.Web/
COPY src/LikeAFoxAspNg.Core/LikeAFoxAspNg.Core.csproj src/LikeAFoxAspNg.Core/
COPY src/LikeAFoxAspNg.Infrastructure/LikeAFoxAspNg.Infrastructure.csproj src/LikeAFoxAspNg.Infrastructure/
RUN dotnet restore src/LikeAFoxAspNg.Web/LikeAFoxAspNg.Web.csproj

COPY src/LikeAFoxAspNg.Web/ClientApp/package.json src/LikeAFoxAspNg.Web/ClientApp/
RUN npm i -g yarn
RUN npm i -g @angular/cli 
RUN cd /src/LikeAFoxAspNg.Web/ClientApp \
    && yarn
COPY . .
WORKDIR /src/LikeAFoxAspNg.Web
RUN dotnet build LikeAFoxAspNg.Web.csproj -c Release -o /app

FROM build AS publish
RUN dotnet publish LikeAFoxAspNg.Web.csproj -c Release -o /app

FROM base AS final
WORKDIR /app

#setup node, this is only needed if you use Node both at runtime and build time. Some people may only need the build part.
ENV NODE_VERSION 8.11.1
ENV NODE_DOWNLOAD_SHA 0e20787e2eda4cc31336d8327556ebc7417e8ee0a6ba0de96a09b0ec2b841f60
RUN curl -SL "https://nodejs.org/dist/v${NODE_VERSION}/node-v${NODE_VERSION}-linux-x64.tar.gz" --output nodejs.tar.gz \
    && echo "$NODE_DOWNLOAD_SHA nodejs.tar.gz" | sha256sum -c - \
    && tar -xzf "nodejs.tar.gz" -C /usr/local --strip-components=1 \
    && rm nodejs.tar.gz \
    && ln -s /usr/local/bin/node /usr/local/bin/nodejs

COPY --from=publish /app .
ENTRYPOINT ["dotnet", "LikeAFoxAspNg.Web.dll"]
