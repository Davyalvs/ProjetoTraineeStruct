"useClient";

import axios from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useUser } from "../../../utils/userContext";

export default function index() {
	const router = useRouter();
	const [nome, setNome] = useState("");
	const [senha, setSenha] = useState("");
	const user = useUser();

	return (
		<>
			<h1>{user?.nome}</h1>
			<p>ID: {user?.userId}</p>
			<p>Email: {user?.email}</p>
			<button
				type="button"
				onClick={async (e) => {
					axios
						.post("api/auth/logout")
						.then((response) => {
							if (response.status == 200) {
								router.push("/login");
							}
						})
						.catch(alert);
				}}
			>
				LOG OUT!
			</button>
			<button
				type="button"
				onClick={async (e) => {
					axios
						.delete("api/user/excluirConta")
						.then((response) => {
							if (response.status == 200) {
								router.push("/login");
							}
						})
						.catch(alert);
				}}
			>
				Excluir conta
			</button>

			<form>
				<input
					name="nome"
					placeholder="nome"
					onChange={(e) => setNome(e.target.value)}
				></input>
				<input
					name="senha"
					placeholder="senha"
					onChange={(e) => setSenha(e.target.value)}
				></input>
				<button
					type="button"
					onClick={async (e) => {
						axios
							.patch("api/user/updateConta", {
								password: senha,
								nome: nome,
							})
							.then((response) => {
								if (response.status == 200) {
									router.reload();
								}
							})
							.catch(alert);
					}}
				>
					Update conta
				</button>
			</form>
		</>
	);
}
