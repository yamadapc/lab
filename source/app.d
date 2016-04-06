import commander;
import std.net.curl;
import std.stdio;
import std.process;

int main(string[] args) {
  auto program = new Commander()
    .usage!("Usage: lab <command> [flags]")
    .parse(args);

  switch (program.param("command")) {
    case "create":
      return runCreate(program.args);
    default:
      stderr.write(program.help());
      return 1;
  }
}

int runCreate(string[] args) {
  writeln(args);
  auto http = HTTP();
  http.addRequestHeader("PRIVATE-TOKEN", environment["GITLAB_TOKEN"]);
  args[0].writeln;
  auto output = post("https://gitlab.com/api/v3/projects", "name=" ~ args[0], http);
  output.writeln;
  return 0;
}
