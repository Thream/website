import Image from "next/image"
import { useRouter } from "next/router"
import { useState } from "react"
import { Type } from "@sinclair/typebox"
import { PhotographIcon } from "@heroicons/react/solid"
import { Form, useForm } from "react-component-form"
import useTranslation from "next-translate/useTranslation"
import classNames from "clsx"
import type { HandleUseFormCallback } from "react-component-form"

import { guildSchema } from "../../../models/Guild"
import { FormState } from "../../design/FormState"
import { useGuildMember } from "../../../contexts/GuildMember"
import { Textarea } from "../../design/Textarea"
import { Input } from "../../design/Input"
import { Button } from "../../design/Button"
import { useAuthentication } from "../../../tools/authentication"
import { ConfirmPopup } from "../ConfirmPopup"
import { useFormTranslation } from "../../../hooks/useFormTranslation"

const schema = {
  name: guildSchema.name,
  description: Type.Optional(guildSchema.description),
}

export const GuildSettings: React.FC = () => {
  const { t } = useTranslation()
  const router = useRouter()
  const { authentication } = useAuthentication()
  const { guild, member } = useGuildMember()

  const [inputValues, setInputValues] = useState({
    name: guild.name,
    description: guild.description,
  })

  const [confirmation, setConfirmation] = useState(false)

  const handleConfirmation = (): void => {
    return setConfirmation(!confirmation)
  }

  const {
    handleUseForm,
    fetchState,
    message,
    errors,
    setFetchState,
    setMessage,
  } = useForm(schema)
  const { getFirstErrorTranslation } = useFormTranslation()

  const onSubmit: HandleUseFormCallback<typeof schema> = async (formData) => {
    try {
      await authentication.api.put(`/guilds/${guild.id}`, formData)
      setInputValues(formData as unknown as any)
      return {
        type: "success",
        message: "application:saved-information",
      }
    } catch (error) {
      return {
        type: "error",
        message: "errors:server-error",
      }
    }
  }

  const onChange: React.ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (event) => {
    setInputValues((oldInputValues) => {
      return {
        ...oldInputValues,
        [event.target.name]: event.target.value,
      }
    })
  }

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    setFetchState("loading")
    const files = event?.target?.files
    if (files != null && files.length === 1 && files[0] != null) {
      const file = files[0]
      const formData = new FormData()
      formData.append("icon", file)
      try {
        await authentication.api.put(`/guilds/${guild.id}/icon`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        setFetchState("idle")
      } catch (error) {
        setFetchState("error")
        setMessage("errors:server-error")
      }
    }
  }

  const handleDelete = async (): Promise<void> => {
    try {
      await authentication.api.delete(`/guilds/${guild.id}`)
    } catch (error) {
      setFetchState("error")
      setMessage("errors:server-error")
    }
  }

  const handleLeave = async (): Promise<void> => {
    try {
      await authentication.api.delete(`/guilds/${guild.id}/members/leave`)
      await router.push("/application")
    } catch (error) {
      setFetchState("error")
      setMessage("errors:server-error")
    }
  }

  return (
    <>
      <Form
        onSubmit={handleUseForm(onSubmit)}
        className="my-auto flex flex-col items-center justify-center py-12"
      >
        {member.isOwner && (
          <div className="flex w-full flex-col items-center justify-center sm:w-fit lg:flex-row">
            <div className=" flex w-full flex-wrap items-center justify-center px-6 sm:w-max">
              <div className="relative">
                <div className="absolute z-50 h-full w-full">
                  <button className="relative flex h-full w-full items-center justify-center transition hover:scale-110">
                    <input
                      type="file"
                      className="absolute h-full w-full cursor-pointer opacity-0"
                      onChange={handleFileChange}
                    />
                    <PhotographIcon color="white" className="h-8 w-8" />
                  </button>
                </div>
                <div className="flex items-center justify-center rounded-full bg-black shadow-xl">
                  <Image
                    quality={100}
                    className="rounded-full opacity-50"
                    src={
                      guild.icon == null
                        ? "/images/data/guild-default.png"
                        : guild.icon
                    }
                    alt="Profil Picture"
                    draggable="false"
                    height={125}
                    width={125}
                  />
                </div>
              </div>
              <div className="mx-12 flex flex-col">
                <Input
                  name="name"
                  label={t("common:name")}
                  placeholder={t("common:name")}
                  className="!mt-0"
                  onChange={onChange}
                  value={inputValues.name}
                  error={getFirstErrorTranslation(errors.name)}
                  data-cy="guild-name-input"
                />
                <Textarea
                  name="description"
                  label={"Description"}
                  placeholder={"Description"}
                  id="textarea-description"
                  onChange={onChange}
                  value={inputValues.description ?? ""}
                  data-cy="guild-description-input"
                />
              </div>
            </div>
          </div>
        )}
        <div className="mt-12 flex flex-col items-center justify-center sm:w-fit">
          <div className="space-x-6">
            {member.isOwner ? (
              <>
                <Button type="submit" data-cy="button-save-guild-settings">
                  {t("application:save")}
                </Button>
                <Button
                  type="button"
                  color="red"
                  onClick={handleConfirmation}
                  data-cy="button-delete-guild-settings"
                >
                  {t("application:delete")}
                </Button>
              </>
            ) : (
              <Button
                color="red"
                onClick={handleLeave}
                data-cy="button-leave-guild-settings"
              >
                {t("application:leave")} {guild.name}
              </Button>
            )}
          </div>
          <FormState
            state={fetchState}
            message={
              message != null
                ? t(message)
                : getFirstErrorTranslation(errors.name)
            }
          />
        </div>
      </Form>
      <div
        className={classNames(
          "pointer-events-none invisible absolute z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-90 opacity-0 backdrop-blur-md transition-all",
          { "pointer-events-auto !visible !opacity-100": confirmation },
        )}
      >
        <ConfirmPopup
          className={classNames("relative top-8 transition-all", {
            "!top-0": confirmation,
          })}
          handleYes={handleDelete}
          handleNo={handleConfirmation}
          title={`${t("application:delete-the-guild")} ?`}
        />
      </div>
    </>
  )
}
