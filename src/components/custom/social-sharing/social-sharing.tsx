import { $, component$, useContext } from "@builder.io/qwik";
import "./social-sharing.scss"
import { langContext } from "~/common/contexts";
import textsData from "../../../internationalization/texts.json"
import { tr } from "~/common/functions";
import { base } from "~/common/constants";

export default component$(() => {

    const langCtx = useContext(langContext)
    let lang;
    if (langCtx == "no-lang") lang = "en_us"
    else lang = langCtx

    const t = textsData.texts

    const url = "https://ericthiberge.fr/mario-kart-7-randomizer"

    /**
     * @description permet de copier l'url du site dans le presse-papier
     * @example copy()
     */
    const copy = $(() => {
        navigator.clipboard.writeText(url)
        const copyLi = document.querySelector(".copy")
        copyLi?.classList.add("copied")
    })

    const customMessage = tr(t.custom_message, lang)    
    const linkWhatsApp = `https://wa.me/?text=${customMessage} ${url}`
    const linkFaceBook = `https://www.facebook.com/sharer/sharer.php?u=${url}`
    const linkX = `https://twitter.com/intent/tweet?text=${customMessage} ${url}`
    const linkReddit = `https://www.reddit.com/submit/?url=${url}&title=${customMessage}`
    const linkMastodon = `https://mastodon.social/share?text=${customMessage} ${url}`
    const linkBlueSky = `https://bsky.app/intent/compose?text=${customMessage} ${url}`
    const linkTelegram = `https://telegram.me/share/url?url=${url}&text=${customMessage}`
    const linkLine = `https://social-plugins.line.me/lineit/share?url=${url}&text=${customMessage}`

    return <>
        <h3>{tr(t.share_title, lang)}</h3>
        <div class="shares">
            <ul>
                <li class="social copy" onClick$={copy}>
                    <img class="black" alt="copy link" src={`${base}social-icons/link.svg`} />
                    {tr(t.copy_link, lang)}
                </li>
                <li class="social whatsapp">
                    <img alt="whatsapp" src={`${base}social-icons/whatsapp.svg`} />
                    <a href={linkWhatsApp} target="_blank">WhatsApp</a>
                </li>
                <li class="social facebook">
                    <img alt="facebook" src={`${base}social-icons/facebook.svg`} />
                    <a href={linkFaceBook} target="_blank">FaceBook</a>
                </li>
                <li class="social x">
                    <img alt="x" src={`${base}social-icons/x.svg`} />
                    <a href={linkX} target="_blank">Twitter/X</a>
                </li>
                <li class="social reddit">
                    <img alt="reddit" src={`${base}social-icons/reddit.svg`} />
                    <a href={linkReddit} target="_blank">Reddit</a>
                </li>
                <li class="social mastodon">
                    <img alt="mastodon" src={`${base}social-icons/mastodon.svg`} />
                    <a href={linkMastodon} target="_blank">Mastodon</a>
                </li>
                <li class="social bluesky">
                    <img alt="bluesky" src={`${base}social-icons/bluesky.svg`} />
                    <a href={linkBlueSky} target="_blank">BlueSky</a>
                </li>
                <li class="social telegram">
                    <img alt="telegram" src={`${base}social-icons/telegram.svg`} />
                    <a href={linkTelegram} target="_blank">Telegram</a>
                </li>
                <li class="social line">
                    <img alt="line" src={`${base}social-icons/line.svg`} />
                    <a href={linkLine} target="_blank">LINE</a>
                </li>
            </ul>   
        </div>
    </>
})