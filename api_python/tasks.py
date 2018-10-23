from invoke import task
from provider import app

@task
def ProviderPact(c):
    print("Building!")
    """Validate pact files against server"""
    import threading

    def run_provider():
        app.run("0.0.0.0", port=3030)

    provider = threading.Thread(target=run_provider, daemon=True)
    provider.start()
    c.run(
        "pact-verifier "
        "--provider-base-url=http://localhost:3030 "
        "--pact-urls=../pacts/films_client-films_provider.json"
    )
